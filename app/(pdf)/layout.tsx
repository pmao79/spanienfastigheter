export default function PdfLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-white text-slate-900 print:bg-white">
                {children}
            </body>
        </html>
    );
}
