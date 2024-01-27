from rest_framework.routers import DefaultRouter
from accounts.views import SignupViewSet,RefreshViewSet,MyTokenObtainPairView,accountDetails,paymentView,myAccount,verify_me,transactHistViewset
from django.urls import path

router  = DefaultRouter()

router.register(r'signup', SignupViewSet, basename='signup')
router.register(r'refresh', RefreshViewSet, basename='refresh-auth-token')
router.register(r'account-details', transactHistViewset, basename='account-details')
router.register(r'payment', paymentView, basename='payment')
router.register(r'myaccount', myAccount, basename='myaccount')
router.register(r'verify-me', verify_me, basename='verify-me')

urlpatterns = [
    *router.urls,
    path('login/',MyTokenObtainPairView.as_view()),
    # path('verify-me/',verify_me.as_view()),
]