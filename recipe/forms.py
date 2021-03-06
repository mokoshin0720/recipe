from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.db.models.query import QuerySet
from django.http import request
from .models import MyUser, Recipe, Tag

class SignupForm(UserCreationForm):
    email = forms.EmailField(widget=forms.TextInput(attrs={
        'placeholder': 'メールアドレス',
    }))
    user_name = forms.CharField(widget=forms.TextInput(attrs={
        'placeholder': 'ユーザー名',
    }))
    password1 = forms.CharField(widget=forms.TextInput(attrs={
        'placeholder': 'パスワード',
    }))
    password2 = forms.CharField(widget=forms.TextInput(attrs={
        'placeholder': 'パスワード（確認用）',
    }))

    class Meta:
        model = MyUser
        fields = ('email', 'user_name', 'password1', 'password2')

class RecipeForm(forms.ModelForm):
    title = forms.CharField(max_length=20,
                            required=True)
    process1 = forms.CharField(max_length=150, 
                                required=True)

    process2 = forms.CharField(max_length=150, 
                                required=False)
    class Meta:
        model = Recipe
        fields = ('title', 'main_image', 'process1', 'process2')

class TagSearchForm(forms.ModelForm):
    tags = forms.ModelMultipleChoiceField(
        queryset=Tag.objects.all(),
        widget=forms.CheckboxSelectMultiple,
        )
    class Meta:
        model = Recipe
        fields = ('tags',)