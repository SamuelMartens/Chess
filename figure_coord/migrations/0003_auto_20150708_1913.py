# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('figure_coord', '0002_challenge'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='challenge',
            name='sender',
        ),
        migrations.RemoveField(
            model_name='challenge',
            name='target',
        ),
        migrations.DeleteModel(
            name='Challenge',
        ),
    ]
