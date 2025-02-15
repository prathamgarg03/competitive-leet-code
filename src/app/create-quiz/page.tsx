'use client';

import { useState } from 'react';
import { createQuiz } from '@/actions/quiz-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {QuestionInput, QuizInput} from "@/types";

export default function CreateQuizPage() {
    const [quizTitle, setQuizTitle] = useState('');
    const [questions, setQuestions] = useState<QuestionInput[]>([
        { question: '', input: [''], output: [''], difficulty: 'EASY' },
    ]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const quizData: QuizInput = {
            title: quizTitle,
            questions,
        };

        const response = await createQuiz(quizData);

        if (response.success) {
            alert('Quiz created successfully!');
        } else {
            alert('Failed to create quiz');
        }
    };

    return (
        <Card className="max-w-lg mx-auto mt-8 p-4">
            <CardHeader>
                <CardTitle className="text-2xl text-center">Create Quiz</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="quizTitle">Quiz Title</Label>
                        <Input
                            id="quizTitle"
                            type="text"
                            value={quizTitle}
                            onChange={(e) => setQuizTitle(e.target.value)}
                            placeholder="Enter quiz title"
                            required
                        />
                    </div>

                    {questions.map((question, index) => (
                        <div key={index}>
                            <Label htmlFor={`question-${index}`}>Question {index + 1}</Label>
                            <Input
                                id={`question-${index}`}
                                type="text"
                                value={question.question}
                                onChange={(e) => {
                                    const newQuestions = [...questions];
                                    newQuestions[index].question = e.target.value;
                                    setQuestions(newQuestions);
                                }}
                                placeholder={`Enter question ${index + 1}`}
                                required
                            />
                        </div>
                    ))}

                    <Button type="submit" className="w-full">Create Quiz</Button>
                </form>
            </CardContent>
        </Card>
    );
}
