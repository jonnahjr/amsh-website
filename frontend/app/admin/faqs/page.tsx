'use client';

import { useState, useEffect } from 'react';
import { faqAPI } from '@/lib/api';
import {
    QuestionMarkCircleIcon,
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    CheckCircleIcon,
    XCircleIcon,
    XMarkIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from '@heroicons/react/24/outline';

export default function FaqsAdmin() {
    const [faqs, setFaqs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [expandedIds, setExpandedIds] = useState<string[]>([]);

    const [formData, setFormData] = useState({
        question: '',
        answer: '',
        category: 'General',
        isActive: true,
        order: 0
    });

    const fetchFaqs = async () => {
        setLoading(true);
        try {
            const res = await faqAPI.getAll();
            setFaqs(res.data.faqs || []);
        } catch (error) {
            console.error('Fetch FAQs error:', error);
            setFaqs([
                { id: '1', question: 'What are your visiting hours?', answer: 'Our visiting hours are from 10:00 AM to 8:00 PM daily.', category: 'General', isActive: true, order: 1 },
                { id: '2', question: 'How can I book an appointment?', answer: 'You can book an appointment through our website or by calling our reception.', category: 'Appointments', isActive: true, order: 2 },
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFaqs();
    }, []);

    const handleOpenModal = (item: any = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                question: item.question,
                answer: item.answer,
                category: item.category,
                isActive: item.isActive,
                order: item.order
            });
        } else {
            setEditingItem(null);
            setFormData({
                question: '',
                answer: '',
                category: 'General',
                isActive: true,
                order: faqs.length + 1
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingItem) {
                await faqAPI.update(editingItem.id, formData);
            } else {
                await faqAPI.create(formData);
            }
            setIsModalOpen(false);
            fetchFaqs();
        } catch (error) {
            alert('Operation failed');
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Delete this FAQ?')) {
            try {
                await faqAPI.delete(id);
                fetchFaqs();
            } catch (error) {
                alert('Delete failed');
            }
        }
    };

    const toggleStatus = async (item: any) => {
        try {
            await faqAPI.update(item.id, { ...item, isActive: !item.isActive });
            fetchFaqs();
        } catch (error) {
            alert('Failed to update status');
        }
    };

    const toggleExpand = (id: string) => {
        setExpandedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const categories = Array.from(new Set(faqs.map(f => f.category)));

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-gray-900">Frequently Asked Questions</h2>
                    <p className="text-gray-500 text-sm">Create and manage FAQs to help users find information quickly.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="btn-primary"
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>Add New FAQ</span>
                </button>
            </div>

            <div className="space-y-8">
                {loading ? (
                    [...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm animate-pulse h-20" />
                    ))
                ) : faqs.length === 0 ? (
                    <div className="bg-white py-24 rounded-[2rem] border border-gray-100 text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <QuestionMarkCircleIcon className="w-10 h-10 text-gray-300" />
                        </div>
                        <p className="text-gray-400 font-black uppercase tracking-widest text-sm">No FAQs added yet</p>
                    </div>
                ) : (
                    categories.length > 0 ? (
                        categories.map(cat => (
                            <div key={cat} className="space-y-4">
                                <h3 className="text-[10px] font-black text-blue-900 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-900" />
                                    {cat}
                                </h3>
                                <div className="grid grid-cols-1 gap-3">
                                    {faqs.filter(f => f.category === cat).sort((a, b) => a.order - b.order).map((item) => (
                                        <div key={item.id} className={`bg-white border rounded-[1.5rem] transition-all overflow-hidden ${expandedIds.includes(item.id) ? 'border-blue-100 shadow-lg' : 'border-gray-100 shadow-sm hover:border-gray-200'}`}>
                                            <div className="p-5 flex items-center justify-between gap-4">
                                                <button
                                                    onClick={() => toggleExpand(item.id)}
                                                    className="flex-1 flex items-center gap-4 text-left"
                                                >
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${expandedIds.includes(item.id) ? 'bg-blue-900 text-white' : 'bg-gray-50 text-gray-400'}`}>
                                                        <QuestionMarkCircleIcon className="w-6 h-6" />
                                                    </div>
                                                    <span className={`font-bold text-sm leading-tight ${!item.isActive ? 'text-gray-400 italic' : 'text-gray-900'}`}>
                                                        {item.question}
                                                    </span>
                                                    {!item.isActive && (
                                                        <span className="text-[8px] font-black bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full uppercase tracking-widest">Hidden</span>
                                                    )}
                                                </button>

                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleOpenModal(item)}
                                                        className="p-2 text-gray-400 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-all"
                                                    >
                                                        <PencilSquareIcon className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                    >
                                                        <TrashIcon className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => toggleExpand(item.id)}
                                                        className="p-2 text-gray-300"
                                                    >
                                                        {expandedIds.includes(item.id) ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
                                                    </button>
                                                </div>
                                            </div>

                                            {expandedIds.includes(item.id) && (
                                                <div className="px-5 pb-5 pt-0 border-t border-gray-50 bg-gray-50/30">
                                                    <div className="mt-4 p-5 bg-white rounded-2xl border border-gray-100 text-gray-600 text-sm leading-relaxed font-medium">
                                                        {item.answer}
                                                    </div>
                                                    <div className="flex items-center gap-4 mt-4 ml-2">
                                                        <button
                                                            onClick={() => toggleStatus(item)}
                                                            className={`text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 ${item.isActive ? 'text-emerald-600' : 'text-amber-600'}`}
                                                        >
                                                            {item.isActive ? <><CheckCircleIcon className="w-4 h-4" /> Published</> : <><XCircleIcon className="w-4 h-4" /> Hidden</>}
                                                        </button>
                                                        <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Order: {item.order}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : null
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-blue-900/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                            <div>
                                <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase">
                                    {editingItem ? 'Edit FAQ' : 'Add New FAQ'}
                                </h3>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                                    Provide clear answers for common questions
                                </p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-white rounded-2xl text-gray-400 hover:text-gray-600 transition-all shadow-sm">
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-10 space-y-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-blue-900 uppercase tracking-widest ml-1">Question</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-900 transition-all"
                                    value={formData.question}
                                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                    placeholder="Enter the question..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-blue-900 uppercase tracking-widest ml-1">Answer</label>
                                <textarea
                                    required
                                    rows={5}
                                    className="w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-900 transition-all resize-none"
                                    value={formData.answer}
                                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                    placeholder="Provide a detailed answer..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-blue-900 uppercase tracking-widest ml-1">Category</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-900 transition-all"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        placeholder="e.g. General, Billing, Services"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-blue-900 uppercase tracking-widest ml-1">Order</label>
                                    <input
                                        type="number"
                                        className="w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-900 transition-all"
                                        value={formData.order}
                                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-8 pt-6">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={formData.isActive}
                                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        />
                                        <div className="w-12 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-900 transition-colors shadow-inner" />
                                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6 shadow-sm" />
                                    </div>
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest group-hover:text-blue-900 transition-colors">Visible to Public</span>
                                </label>

                                <button
                                    type="submit"
                                    className="flex-1 btn-primary py-5 rounded-[1.5rem] shadow-xl shadow-blue-900/20 text-xs tracking-[0.2em]"
                                >
                                    {editingItem ? 'Update FAQ' : 'Save FAQ'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
