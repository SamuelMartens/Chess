# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('figure_coord', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='challenge',
            name='status',
            field=models.CharField(max_length=1, default='u', choices=[('u', 'undefined'), ('a', 'accepted'), ('r', 'rejected')]),
            preserve_default=True,
        ),
    ]
