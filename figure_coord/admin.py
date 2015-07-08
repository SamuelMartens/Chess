from django.contrib import admin

from figure_coord.models import Move, Game, Figure, Challenge

# Register your models here.

admin.site.register(Move)
admin.site.register(Challenge)
admin.site.register(Figure)
admin.site.register(Game)
