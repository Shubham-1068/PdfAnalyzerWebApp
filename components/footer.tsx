import React from 'react'
import { MessageCircle } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-2 mb-4 md:mb-0">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <MessageCircle className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-xl text-white">PDFChat</span>
                        <p className="text-sm text-slate-400">
                            © 2025 PDFChat. Join the future of document interaction.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer