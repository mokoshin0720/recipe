from collections import namedtuple
from django.shortcuts import get_object_or_404, redirect, render
from django.contrib.auth import authenticate, login
from .forms import RecipeForm, SignupForm, TagSearchForm
from .models import Recipe, Tag
from django.contrib.auth.decorators import login_required

'''
About home
'''
def index(request):
    user = request.user
    return render(request, 'index.html', {'user': user})

@login_required
def home(request):
    return render(request, 'home.html')

'''
About User
'''
def signup(request):
    if request.method == "POST":
        form = SignupForm(request.POST)
        if form.is_valid():
            form.save()
            email = form.cleaned_data.get('email')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(email=email, password=raw_password)
            login(request, user)
            return redirect('index')
    else:
        form = SignupForm()
    return render(request, 'signup.html', {"form": form})

'''
About recipe
'''
def list(request):
    all_recipes = Recipe.objects.order_by('-created_at')
    return render(request, 'list.html', {"all_recipes": all_recipes})

def create(request):
    if request.method == "POST":
        form = RecipeForm(request.POST, request.FILES)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            post.save()
            tag_list = form.cleaned_data["tags"]
            for tag in tag_list:
                t = Tag.objects.get(name=tag)
                post.tags.add(t)
            return redirect('index')
    else:
        form = RecipeForm
    return render(request, 'create.html', {'form':form})

def taglist(request):
    form = TagSearchForm(request.GET)
    if form.is_valid():
        tag_list = form.cleaned_data["tags"]
        recipe_list = tag_search(tag_list)
        return render(request, 'taglist.html', {'form':form, 'recipe_list':recipe_list})
    else:    
        return render(request, 'taglist.html', {'form':form})

# 複数タグからレシピを検索する関数
def tag_search(tag_list):
    recipe_list = Recipe.objects.all()
    for tag in tag_list:
        recipe_list = recipe_list.filter(tags__name=tag)
    return recipe_list

def delete(request, pk):
    recipe = get_object_or_404(Recipe, pk=pk)
    recipe.delete()
    return redirect(request.META['HTTP_REFERER'])