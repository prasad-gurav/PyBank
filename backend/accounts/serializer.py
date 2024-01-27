from rest_framework import serializers
from .models import accounts,Transaction
from django.utils.translation import gettext_lazy as _
from accounts.utils import generate_random_number
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django import forms



class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = accounts
        fields = ['id','email', ...]
        
class myAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = accounts
        fields = '__all__'

    exclude_fields = ['password']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Dynamically exclude fields
        for field_name in self.exclude_fields:
            self.fields.pop(field_name, None)
    
class accountsSerializer(serializers.ModelSerializer):
    class Meta:
        model = accounts
        fields = ['email','account_num','account_bal', 'date_joined']
        read_only_field = ['email','account_num','account_bal', 'date_joined']

class loginSerializer(serializers.Serializer):
    email = serializers.EmailField(label="Email")
    password = serializers.CharField(
        label="Password",
        style={"input_type": "password"},
        trim_whitespace=False,
    )

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")
        print('validating data',email,password)
        if email and password:
            request = self.context.get("request")

            user = authenticate(request=request, email=email, password=password)
            if not user:
                msg = "Unable to log in with provided credentials."
                raise serializers.ValidationError(msg, code="authorization")
        else:
            msg = "Must include 'email' and 'password'."
            raise serializers.ValidationError(msg, code="authorization")
        print(user)
        attrs["user"] = user
        return attrs


class LoginSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['user'] = CustomUserSerializer(self.user).data
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        return data
    
    
class signupSerializer(serializers.ModelSerializer):
    model = accounts
    class Meta:
        model = accounts
        fields = '__all__'

    def crete_account(self,email,password,**extra_fields):
        if not email:
            raise ValueError(_("The Email must be set"))
        try:
            email = self.normalize_email(email)
        except:
            pass
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.account_num = generate_random_number()
        user.save()
        return user
    

class accountDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'

        
class paymentnSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=16)
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    class Meta:
        fields = ['email','amount']


class transactHistSerializers(serializers.Serializer):
    transactions_type = serializers.DecimalField(max_digits=10, decimal_places=2)
    class Meata:
        fields = ['transactions_type']
        
class verifySerializer(serializers.Serializer):
    user_id = serializers.CharField(max_length=12)
    token = serializers.DecimalField(max_digits=10, decimal_places=2)
    class Meta:
        fields = ['user_id','token']