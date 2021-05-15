from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)

class MyUserManager(BaseUserManager):
    def create_user(self, email, user_name, password=None):
        if not email:
            raise ValueError('メールアドレスを入力してください。')
 
        user = self.model(
            email=self.normalize_email(email),
            user_name=user_name,
        )
 
        user.set_password(password)
        user.save(using=self._db)
        return user
 
    def create_superuser(self, email, user_name, password=None):
        user = self.create_user(
            email,
            password=password,
            user_name=user_name,
        )
        user.is_admin = True
        user.is_staff = True
        user.save(using=self._db)
        return user 
 
class MyUser(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='メールアドレス',
        max_length=255,
        unique=True,
    )
    user_name = models.CharField(max_length=15, unique=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
 
    objects = MyUserManager()
 
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_name']
 
    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True
 
    def has_module_perms(self, app_label):
        return True
 
    @property
    def is_staff(self):
        return self.is_admin