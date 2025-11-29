export interface PdfData {
    pages: string[];
    info: any;
}

/**
 * PDF dosyasından metinleri sayfa sayfa ayıklar.
 * @param file Yüklenen PDF dosyası
 * @returns Sayfa metinleri ve PDF bilgisi
 */
export async function extractTextFromPdf(file: File): Promise<PdfData> {
    // Dynamically import pdfjs-dist only on client side
    const pdfjsLib = await import('pdfjs-dist');

    // Worker ayarını yapıyoruz. CDN kullanarak worker'ı yüklüyoruz.
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

    const arrayBuffer = await file.arrayBuffer();

    // PDF dosyasını yükle
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    const pages: string[] = [];

    // Her sayfayı tek tek dolaş ve metni al
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();

        // Sayfadaki metin parçalarını birleştir
        const pageText = textContent.items
            .map((item: any) => item.str)
            .join(' ');

        pages.push(pageText);
    }

    return {
        pages,
        info: {
            numPages: pdf.numPages,
        }
    };
}
