from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager,  PermissionsMixin
from django.utils import timezone
from .manager import accountManager
from django.utils.translation import gettext_lazy as _


class accounts(AbstractBaseUser, PermissionsMixin):
    profile_pic = models.ImageField(upload_to='profiles/')
    email = models.EmailField(_("email address"), unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    first_name = models.CharField(max_length=10)
    last_name = models.CharField(max_length=10)
    dob = models.CharField(max_length=10)
    phone = models.CharField(max_length=12)
    gender = models.CharField(max_length=10,null=True)
    account_num = models.CharField(max_length=12)
    account_bal = models.IntegerField(default=0)

    verify_access_token = models.CharField(null=True,max_length=16)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = accountManager()

    def __str__(self):
        return self.email
    
    class Meta:
        ordering = ['date_joined']

class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ('deposit', 'Deposit'),
        ('withdrawal', 'Withdrawal'),
        ('transfer', 'Transfer'),
        
    ]

    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPES)
    amount = models.DecimalField(max_digits=100, decimal_places=2)
    timestamp = models.DateTimeField(default=timezone.now)
    account_from = models.ForeignKey(accounts, related_name='transactions_from', on_delete=models.CASCADE)
    account_to = models.ForeignKey(accounts, related_name='transactions_to',on_delete=models.CASCADE)