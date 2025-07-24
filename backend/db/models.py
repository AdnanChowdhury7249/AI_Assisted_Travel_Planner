from sqlalchemy import (
    Table,
    Column,
    String,
    Integer,
    Float,
    DateTime,
    Text,
    ForeignKey,
    func,
)
from .database import metadata

trips = Table(
    "trips",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("location", String),
    Column("num_people", Integer),
    Column("budget", Float, nullable=False),
    Column("duration", Integer),
    Column("created_at", DateTime, server_default=func.now()),
    Column("updated_at", DateTime, onupdate=func.now()),
)

itineraries = Table(
    "itineraries",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("trip_id", Integer, ForeignKey("trips.id")),
    Column("content", Text),
    Column("created_at", DateTime, server_default=func.now()),
    Column("status", String),
)
