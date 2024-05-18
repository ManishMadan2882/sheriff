# Use a pipeline as a high-level helper
from transformers import pipeline

pipe = pipeline("text-generation", model="segolilylabs/Lily-Cybersecurity-7B-v0.2")

msg = pip('Hello tell me about yourself')