from django.shortcuts import redirect, render
from django.contrib.auth import authenticate, login
from .forms import RecipeForm, SignupForm
from .models import Recipe
from django.contrib.auth.decorators import login_required

# Create your views here.
def index(request):
    user = request.user
    return render(request, 'index.html', {'user': user})

@login_required
def home(request):
    return render(request, 'home.html')

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

def list(request):
    all_recipes = Recipe.objects.order_by('-created_at')
    return render(request, 'list.html', {"all_recipes": all_recipes})

def create(request):
    if request.method == "POST":
        form = RecipeForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            post.save()
            return redirect('index')
    else:
        form = RecipeForm
    return render(request, 'create.html', {'form':form})