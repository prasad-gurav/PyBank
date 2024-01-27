from django.contrib import admin
from accounts.models import accounts,Transaction

admin.site.register(accounts)
admin.site.register(Transaction)
