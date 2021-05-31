from django import forms
from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
 
from .models import MyUser, Recipe, Tag
 
 
class UserCreationForm(forms.ModelForm):
    password1 = forms.CharField(label='パスワード', widget=forms.PasswordInput)
    password2 = forms.CharField(
        label='パスワード（確認用）', widget=forms.PasswordInput)
 
    class Meta:
        model = MyUser
        fields = ('email', 'user_name')
 
    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("同じパスワードを入力してください。")
        return password2
 
    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user
 
 
class UserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField()
 
    class Meta:
        model = MyUser
        fields = ('email', 'password', 'user_name',
                  'is_active', 'is_admin')
 
    def clean_password(self):
        return self.initial["password"]
 
 
class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm
 
    list_display = ('email', 'user_name', 'is_admin')
    list_filter = ('is_admin',)
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('user_name',)}),
        ('Permissions', {'fields': ('is_admin',)}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'user_name', 'password1', 'password2'),
        }),
    )
    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ()
 
admin.site.register(MyUser, UserAdmin)
# admin.site.unregister(Group)
admin.site.register(Recipe)
admin.site.register(Tag)