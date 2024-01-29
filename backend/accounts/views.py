from rest_framework import viewsets,permissions
from accounts.serializer import accountsSerializer,signupSerializer,accountDetailsSerializer,paymentnSerializer,myAccountSerializer,verifySerializer,transactHistSerializers
from accounts.models import accounts,Transaction
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.response import Response
from accounts.utils import generate_random_number,generate_random_string
from rest_framework.views import APIView
import os
from rest_framework.parsers import MultiPartParser,FormParser
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework.decorators import action
from accounts.send_email import sendMail,send_verify_email

class accountViewset(viewsets.ModelViewSet):
    queryset = accounts.objects.all()
    serializer_class = accountsSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['name'] = user.first_name
        token['email'] = user.email
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Sign Up viewset 
class SignupViewSet(viewsets.ModelViewSet):
    queryset = accounts.objects.all()
    serializer_class = signupSerializer  # Use your User serializer
    parser_classes = (MultiPartParser,FormParser)
    permission_classes = [AllowAny]  # Use AllowAny to allow unauthenticated users

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        user.set_password(user.password)
        user.account_num = generate_random_number()
        user.account_bal = 2000
        user.save()
        verify_token = generate_random_string(16)
        user.verify_access_token = verify_token
        user.save()
        headers = self.get_success_headers(serializer.data)

        success_data = {
            'status':'Signup Successfull',
            'user_id': user.id,
            'verify_token':verify_token
        }
        
        send_verify_email(user.email,f'{user.first_name} {user.last_name}',f'http://localhost:3000/verifyuser/{user.id}-{verify_token}')
        return Response(success_data, status=status.HTTP_200_OK, headers=headers)
    

class RefreshViewSet(viewsets.ViewSet, TokenRefreshView):
    permission_classes = (AllowAny,)
    http_method_names = ['post']
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)
    

class accountDetails(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = accountDetailsSerializer

    def list(self, request, *args, **kwargs):
        print(request.data.get('custom_param'))
        # Get the user ID from the request (assuming the user is authenticated)
        user_id = accounts.objects.get(email = request.user.email)
        transaction_type = request.data['transaction_type']

        if transaction_type == 'send_by_me':
            print('i am sender')
            transactions = user_id.transactions_from.all()
        else:
            print('i am receiver')
            transactions = user_id.transactions_to.all() 

        transaction_dict = list(transactions.values())

        # Serialize the transactions and return the response
        serializer = self.get_serializer(transactions, many=True)

        for transaction in transactions:
                user = accounts.objects.get(email = transaction.account_to)
                for dict in transaction_dict:
                    dict.update({'full_name': f'{user.first_name} {user.last_name}','profile_pic':user.profile_pic.url,'account_num':user.account_num})

        serialized_data = list(serializer.data)

        for i in range(len(serialized_data)):
            serialized_data[i]['additional_data'] = transaction_dict[i]

        return Response(serialized_data)
  
    
class paymentView(viewsets.ViewSet):
    model = Transaction
    serializer_class = paymentnSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        sender = request.user.email
        receiver_email = request.data['email']
        amount = int(request.data['amount'])
        
        receiver_user = None
        sender_user = accounts.objects.get(email=sender)
        try:
            receiver_user = accounts.objects.get(email = receiver_email)
        except Exception as e:
            pass

        if receiver_user is not None:
            try:
                sender_user.account_bal -= amount # amount deduct from sender account
                sender_user.save()
                receiver_user.account_bal += amount # amount transger to receiver account
                receiver_user.save()
            except Exception as e:
                print(e)

            transaction = Transaction.objects.create(account_from= sender_user,
                account_to= receiver_user,
                amount = amount,
                transaction_type ='transfer')
            transaction.save()
            return Response({
                "Transaction Status": "Completed",
  
        },status=status.HTTP_200_OK)
        else:
            return Response({
                "Transaction Status": "Incomplete",
                "Reason" : "Receiver User Not found"
  
        },status=status.HTTP_200_OK)


class myAccount(viewsets.ViewSet):
    model = accounts
    serializer_class = myAccountSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def list(self, request, *args, **kwargs):
        # Get the user ID from the request (assuming the user is authenticated)
        user_data = accounts.objects.get(email = request.user.email)
        # Serialize the transactions and return the response
        serializer = self.serializer_class(user_data)

        return Response(serializer.data)


class transactHistViewset(viewsets.ViewSet):
    serializer_class = transactHistSerializers
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        
        user_id = accounts.objects.get(email = request.user.email)
        transaction_type = request.data['transaction_type']

        if transaction_type == 'send_by_me':
            print('i am sender')
            transactions = user_id.transactions_from.all()
        else:
            print('i am receiver')
            transactions = user_id.transactions_to.all() 

        transaction_dict = list(transactions.values())

        # Serialize the transactions and return the response
        serializer = accountDetailsSerializer(transactions, many=True)

        for transaction in transactions:
                user = accounts.objects.get(email = transaction.account_to)
                for dict in transaction_dict:
                    dict.update({'full_name': f'{user.first_name} {user.last_name}','profile_pic':user.profile_pic.url,'account_num':user.account_num})

        serialized_data = list(serializer.data)

        for i in range(len(serialized_data)):
            serialized_data[i]['additional_data'] = transaction_dict[i]
        return Response(serialized_data)
    
class verify_me(viewsets.ViewSet):
    serializer_class = verifySerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        success_res = {'status':'User Not verified'}
        print('checking credintials')
        print(request.data)
        # Get the user ID from the request (assuming the user is authenticated)
        user_data = accounts.objects.get(id = int(request.data['user_id']))
        token = request.data['token']
        
        print(token)
        print(user_data)
        if user_data.verify_access_token == token:
            user_data.is_active = True
            user_data.save()
            success_res = {'status':'User verified'}
            sendMail(user_data)
        # # Serialize the transactions and return the response
        # serializer = self.serializer_class(user_data)
        
        return Response(success_res)