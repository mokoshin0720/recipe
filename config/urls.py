from django.contrib import admin
from django.urls import include, path   # includeを追加
from django.views.generic import TemplateView   # 追加

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('recipe.urls')),
]
