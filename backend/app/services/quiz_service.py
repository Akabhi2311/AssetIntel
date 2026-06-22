from app.database import SessionLocal
from app.models.quiz import QuizResult


def save_quiz_results(
    user_id,
    topic,
    questions,
    user_answers
):

    db = SessionLocal()

    try:

        for i, question in enumerate(questions):

            # ✅ SAFE USER ANSWER
            selected = ""

            if i < len(user_answers):
                selected = user_answers[i]

            # ✅ SUPPORT BOTH KEYS
            correct_answer = (
                question.get("correct_answer")
                or question.get("answer")
                or ""
            )

            # ✅ QUESTION TEXT
            question_text = question.get("question", "")

            # ✅ CASE-INSENSITIVE CHECK
            correct = (
                str(selected).strip().lower()
                ==
                str(correct_answer).strip().lower()
            )

            quiz = QuizResult(
                user_id=user_id,
                topic=topic,
                question=question_text,
                selected_answer=selected,
                correct_answer=correct_answer,
                correct=correct
            )

            db.add(quiz)

        db.commit()

        print("✅ Quiz saved successfully")

    except Exception as e:

        db.rollback()

        print("❌ QUIZ SAVE ERROR:", str(e))

    finally:

        db.close()