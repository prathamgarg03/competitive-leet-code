// 'use client';
//
// import { useState } from 'react';
// import { createQuiz } from '@/actions/quiz-actions';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { QuestionInput, QuizInput } from '@/types';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
//
// export default function CreateQuizPage() {
//     const [quizTitle, setQuizTitle] = useState('');
//     const [questions, setQuestions] = useState<QuestionInput[]>([
//         { question: '', input: [''], output: [''], difficulty: 'EASY' },
//     ]);
//
//     const handleAddQuestion = () => {
//         setQuestions([...questions, { question: '', input: [''], output: [''], difficulty: 'EASY' }]);
//     };
//
//     const handleInputChange = (index: number, field: keyof QuestionInput, value: any) => {
//         const updatedQuestions = [...questions];
//         updatedQuestions[index][field] = value;
//         setQuestions(updatedQuestions);
//     };
//
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//
//         const quizData: QuizInput = {
//             title: quizTitle,
//             questions,
//         };
//
//         const response = await createQuiz(quizData);
//
//         if (response.success) {
//             alert('Quiz created successfully!');
//         } else {
//             alert('Failed to create quiz');
//         }
//     };
//
//     return (
//         <Card className="max-w-lg mx-auto mt-8 p-4">
//             <CardHeader>
//                 <CardTitle className="text-2xl text-center">Create Quiz</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <Label htmlFor="quizTitle">Quiz Title</Label>
//                         <Input
//                             id="quizTitle"
//                             type="text"
//                             value={quizTitle}
//                             onChange={(e) => setQuizTitle(e.target.value)}
//                             placeholder="Enter quiz title"
//                             required
//                         />
//                     </div>
//
//                     {questions.map((question, index) => (
//                         <div key={index} className="p-2 border rounded-lg space-y-2">
//                             <Label>Question {index + 1}</Label>
//                             <Input
//                                 type="text"
//                                 value={question.question}
//                                 onChange={(e) => handleInputChange(index, 'question', e.target.value)}
//                                 placeholder={`Enter question ${index + 1}`}
//                                 required
//                             />
//
//                             <Label>Input</Label>
//                             <Input
//                                 type="text"
//                                 value={question.input[0]}
//                                 onChange={(e) => handleInputChange(index, 'input', [e.target.value])}
//                                 placeholder="Enter input"
//                                 required
//                             />
//
//                             <Label>Output</Label>
//                             <Input
//                                 type="text"
//                                 value={question.output[0]}
//                                 onChange={(e) => handleInputChange(index, 'output', [e.target.value])}
//                                 placeholder="Enter output"
//                                 required
//                             />
//
//                             <Label>Difficulty</Label>
//                             <Select
//                                 onValueChange={(value) => handleInputChange(index, 'difficulty', value)}
//                                 defaultValue={question.difficulty}
//                             >
//                                 <SelectTrigger>
//                                     <SelectValue placeholder="Select difficulty" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="EASY">Easy</SelectItem>
//                                     <SelectItem value="MEDIUM">Medium</SelectItem>
//                                     <SelectItem value="HARD">Hard</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                         </div>
//                     ))}
//
//                     <Button type="button" className="w-full" onClick={handleAddQuestion}>
//                         Add Question
//                     </Button>
//
//                     <Button type="submit" className="w-full">
//                         Create Quiz
//                     </Button>
//                 </form>
//             </CardContent>
//         </Card>
//     );
// }
