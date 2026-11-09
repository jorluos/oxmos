import { useApp } from '../../../context/AppContext';
import { ArrowRight } from 'lucide-react';
import mujerImage from '../../../../../assets/mujer.png';
import hombreImage from '../../../../../assets/hombre.png';

export function TwoColumnPromo() {
    const { navigate, darkMode } = useApp();
    return (
        <section className={`py-20 px-4 sm:px-8 ${darkMode ? 'bg-white/5' : 'bg-black/5'}`}>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Women */}
                    <div
                        onClick={() => navigate('catalog')}
                        className="relative h-72 sm:h-96 overflow-hidden bg-black cursor-pointer group"
                    >
                        <img
                            src={mujerImage}
                            alt="Colección Mujer"
                            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                            <div>
                                <span className="text-xs tracking-[0.4em] uppercase text-white/70 mb-1 block">Colección</span>
                                <h3 className="text-2xl sm:text-3xl font-light">Mujer</h3>
                            </div>
                            <span className="w-10 h-10 border border-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                                <ArrowRight size={18} />
                            </span>
                        </div>
                    </div>

                    {/* Men */}
                    <div
                        onClick={() => navigate('catalog')}
                        className="relative h-72 sm:h-96 overflow-hidden bg-black cursor-pointer group"
                    >
                        <img
                            src={hombreImage}
                            alt="Colección Hombre"
                            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                            <div>
                                <span className="text-xs tracking-[0.4em] uppercase text-white/70 mb-1 block">Colección</span>
                                <h3 className="text-2xl sm:text-3xl font-light">Hombre</h3>
                            </div>
                            <span className="w-10 h-10 border border-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                                <ArrowRight size={18} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
