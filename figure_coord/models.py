from django.db import models
from django.db.models.signals import post_save


from django.contrib.auth.models import User

# Create your models here.


GAME_STATUS_CHOICES = (
    ("w", "white_player_turn"),
    ("b", "black_player_turn"),
    ("f", "finished_game"),
)


class Game (models.Model):
    created = models.DateTimeField(auto_now_add = True)
    w_player = models.ForeignKey(User, related_name="game_whiteplayer")
    b_player = models.ForeignKey(User, related_name="game_blackplayer")
    length = models.DateTimeField()
    status = models.CharField( max_length = 1, choices = GAME_STATUS_CHOICES)
    winner = models.ForeignKey(User , blank = True , null = True)
    last_move = models.DateTimeField(null=True, blank=True, db_index=True)


FIGURE_STATUS_CHOICES = (
    ("a", "alive"),
    ("d", "death"),
)


FIGURE_TEAM_CHOICES = (
    ("b" , "black_team"),
     ("w" , "white_teak"),
)


class Figure (models.Model):
    name  = models.CharField(max_length = 30)
    team = models.CharField ( max_length = 1 , choices = FIGURE_TEAM_CHOICES )
    coord = models.CharField (max_length = 15)
    status = models.CharField( max_length = 1, choices = FIGURE_STATUS_CHOICES)
    equation = models.CharField( max_length=20)


FIGURE_MOVE_TYPE_CHOICES = (
    ("m", "move"),
    ("d", "death_from_somedody"),
    ("k", "kill_somebody")
)


class Move(models.Model):
    # ifluential -  firgure which kill or killed by current figure
    figure = models.ForeignKey(Figure, related_name="move_figure")
    game = models.ForeignKey (Game)
    coord_from = models.CharField ( max_length = 15 ,blank = True, null = True)
    coord_to = models.CharField ( max_length = 15 , blank = True, null = True)
    move_type = models.CharField ( max_length = 1, choices = FIGURE_MOVE_TYPE_CHOICES)
    influential = models.ForeignKey ( Figure , blank = True, null = True, related_name= "move_influential_figure")
    timestamp = models.DateTimeField( auto_now_add = True , db_index = True)


def update_last_move_datetime(sender,instance,created,**kwargs):
    """
    Update Game's last move field when
    a new message is sent.
    """

    if not created:
        return

    Move.objects.filter(id=instance.game.id).update(
        last_message=instance.timestamp
    )


post_save.connect(update_last_move_datetime,sender=Move)