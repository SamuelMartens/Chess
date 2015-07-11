# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Challenge',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID', auto_created=True)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('sender', models.ForeignKey(related_name='challenge_sender', to=settings.AUTH_USER_MODEL)),
                ('target', models.ForeignKey(related_name='challenge_target', to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Figure',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID', auto_created=True)),
                ('name', models.CharField(max_length=30)),
                ('team', models.CharField(choices=[('b', 'black_team'), ('w', 'white_teak')], max_length=1)),
                ('coord', models.CharField(max_length=15)),
                ('status', models.CharField(choices=[('a', 'alive'), ('d', 'death')], max_length=1)),
                ('equation', models.CharField(max_length=20)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID', auto_created=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('length', models.IntegerField(default=0)),
                ('status', models.CharField(choices=[('n', 'new_game'), ('w', 'white_player_turn'), ('b', 'black_player_turn'), ('f', 'finished_game')], max_length=1)),
                ('last_move', models.DateTimeField(db_index=True, blank=True, null=True)),
                ('b_player', models.ForeignKey(related_name='game_blackplayer', to=settings.AUTH_USER_MODEL)),
                ('w_player', models.ForeignKey(related_name='game_whiteplayer', to=settings.AUTH_USER_MODEL)),
                ('winner', models.ForeignKey(to=settings.AUTH_USER_MODEL, blank=True, null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Move',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID', auto_created=True)),
                ('coord_from', models.CharField(blank=True, max_length=15, null=True)),
                ('coord_to', models.CharField(blank=True, max_length=15, null=True)),
                ('move_type', models.CharField(choices=[('m', 'move'), ('d', 'death_from_somedody'), ('k', 'kill_somebody')], max_length=1)),
                ('timestamp', models.DateTimeField(db_index=True, auto_now_add=True)),
                ('figure', models.ForeignKey(related_name='move_figure', to='figure_coord.Figure')),
                ('game', models.ForeignKey(to='figure_coord.Game')),
                ('influential', models.ForeignKey(to='figure_coord.Figure', blank=True, related_name='move_influential_figure', null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
