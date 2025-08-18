---
title: "Java Based Command Line Interface RPG!"
date: "2025-08-11"
---

(It was originally posted on my previous blog and has been updated here.)

It has been a long time since I last worked on a project in Java. Most of my use of the language in recent years has been for coursework, solving algorithm problems, and not enjoying it very much. Java always felt heavy to me, and I associated it with frustration more than anything else. When my senior suggested making a small RPG in Java using only the command line, I wasn’t expecting much. But once I started, it became a different experience. I realized that building something complete with even the most basic concepts can change how you see the language. For the first time in a while, I was using Java not because I was forced to, but because I wanted to see what I could actually make with it.

I wanted the project to be as simple as possible while still looking like a game. The goal was that someone new to Java could look at the code and understand it without too much difficulty. That’s why I focused only on the fundamentals: loops, simple logic, classes, and file I/O. At the same time, I wanted to use inheritance properly. I created a base `Player` class and then extended it for different characters. In the same way, enemies and bosses also shared a base structure, which made it easier to expand the code without rewriting the same logic again and again. Even though it was just practice, it gave me a sense of actually applying what I had learned in a real project.

For the theme, I chose the Mahabharata. It gave me ready-made characters and a narrative backbone. I designed three heroes that also act as difficulty levels. Arjuna is focused on dexterity and critical strikes, a faster and easier playstyle. Bhima is strong and durable, built for players who want a balanced but slightly harder run. Yudhishthira is more tactical and wisdom-based, leveling faster but requiring careful choices. On the enemy side, I wanted progression to feel steady, so I used inheritance there too, starting with basic spirits and leading up to stronger enemies, mini-bosses, and eventually the Vengeful Spirit of Duryodhana as the final challenge. Seeing it all come together step by step reminded me that inheritance is not just a concept in textbooks, but something that makes sense when you’re building even a small game.

To make the game feel more complete, I added a save system and a log file. The save file allows you to pause and resume later, and the log records the events so you know where you left off. These weren’t complicated to implement, but they gave the project a sense of polish. It stopped feeling like a collection of loops and classes and started feeling like an actual little RPG.

Working on this reminded me why finishing projects matters more than chasing something perfect. Java was always a language I didn’t want to use, but through this I ended up building something I feel proud to show others. It is not a big game and it is not meant to be, but it is a complete one, made from the basics I once disliked and now have a new respect for.
