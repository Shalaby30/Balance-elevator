import Image from 'next/image';

const spareParts = [
    {
        id: 1,
        name: 'ماكينة فتح باب الأسانسير',
        href: '#',
        imageSrc: 'https://www.sciencing.com/sciencing/how-to-build-a-model-elevator-science-project-12742289/494856007.jpg',
        imageAlt: 'ماكينة فتح باب الأسانسير',
        price: '14,000 ج.م',
        model: 'EDO-2023',
    },
    {
        id: 2,
        name: 'بكرة جر (Traction Sheave)',
        href: '#',
        imageSrc: 'https://www.sciencing.com/sciencing/how-to-build-a-model-elevator-science-project-12742289/494856007.jpg',
        imageAlt: 'بكرة جر الأسانسير',
        price: '10,000 ج.م',
        model: 'TS-4500',
    },
    {
        id: 3,
        name: 'كارت الكنترول الرئيسي',
        href: '#',
        imageSrc: 'https://www.sciencing.com/sciencing/how-to-build-a-model-elevator-science-project-12742289/494856007.jpg',
        imageAlt: 'كارت كنترول الأسانسير',
        price: '21,000 ج.م',
        model: 'CB-7500',
    },
    {
        id: 4,
        name: 'مروحة كابينة',
        href: '#',
        imageSrc: 'https://www.sciencing.com/sciencing/how-to-build-a-model-elevator-science-project-12742289/494856007.jpg',
        imageAlt: 'مروحة كابينة الأسانسير',
        price: '3,800 ج.م',
        model: 'CF-230V',
    },
    {
        id: 5,
        name: 'شاشة بيان الأدوار',
        href: '#',
        imageSrc: 'https://www.sciencing.com/sciencing/how-to-build-a-model-elevator-science-project-12742289/494856007.jpg',
        imageAlt: 'شاشة بيان أدوار الأسانسير',
        price: '5,500 ج.م',
        model: 'FDI-10',
    },
    {
        id: 6,
        name: 'بطارية طوارئ',
        href: '#',
        imageSrc: 'https://www.sciencing.com/sciencing/how-to-build-a-model-elevator-science-project-12742289/494856007.jpg',
        imageAlt: 'بطارية طوارئ الأسانسير',
        price: '7,800 ج.م',
        model: '12V / 100AH',
    },
    {
        id: 7,
        name: 'رول تعليق باب',
        href: '#',
        imageSrc: 'https://www.sciencing.com/sciencing/how-to-build-a-model-elevator-science-project-12742289/494856007.jpg',
        imageAlt: 'رول باب الأسانسير',
        price: '1,100 ج.م',
        model: 'DHR-45',
    },
    {
        id: 8,
        name: 'جهاز منظم السرعة',
        href: '#',
        imageSrc: 'https://www.sciencing.com/sciencing/how-to-build-a-model-elevator-science-project-12742289/494856007.jpg',
        imageAlt: 'منظم سرعة الأسانسير',
        price: '16,500 ج.م',
        model: 'SG-1.75',
    },
];

export default function SparePartsPage() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
                    قطع غيار الأسانسيرات
                </h1>
                <p className="text-gray-600 mb-8">
                    جميع قطع الغيار الأصلية للأسانسيرات – جودة عالية وضمان
                </p>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                    {spareParts.map((part) => (
                        <div
                            key={part.id}
                            className="group relative border rounded-lg p-4 hover:shadow-lg transition-shadow"
                        >
                            <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-100 lg:h-60">
                                <Image
                                    src={part.imageSrc}
                                    alt={part.imageAlt}
                                    width={300}
                                    height={300}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <div className="mt-4">

                                <div className='flex justify-between'>
                                    <div className='right'>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {part.name}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            الموديل: {part.model}
                                        </p>
                                    </div>
                                    <div className='left'>
                                        <p className="mt-2 text-lg font-bold text-gray-900">
                                            {part.price}
                                        </p>
                                    </div>

                                </div>



                                <button className="mt-4 w-full bg-secondary/30  py-2 rounded-md hover:bg-blue-700 transition-colors">
                                    إضافة إلى السلة
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
