"use client";
import { useEffect, useRef, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import type { PDFDocumentProxy } from "pdfjs-dist";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { CloudUpload, LoaderCircle, RefreshCw, ZoomIn, ZoomOut } from "lucide-react";
import { saveAs } from "file-saver";
import { degrees, PDFDocument } from "pdf-lib";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

export default function Home() {
    const pdfRef = useRef<any>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null); // 存储文件URL
    const [numPages, setNumPages] = useState<number>(0); // 存储PDF总页数
    const [rotationArray, setRotationArray] = useState<number[]>([0]); // 存储每页旋转角度
    const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null); // 存储PDF字节内容
    const [width, setWidth] = useState<number>(200); // 存储PDF宽度
    const [scale, setScale] = useState<number>(0.3); // 存储缩放比例

    useEffect(() => {
        // 加载 PDF 并获取其字节内容
        const fetchPdf = async () => {
            if (fileUrl) {
                const response = await fetch(fileUrl);
                const arrayBuffer = await response.arrayBuffer();
                setPdfBytes(new Uint8Array(arrayBuffer));
            }
        };
        fetchPdf();
    }, [fileUrl]);

    // 处理文件选择
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const selectedFiles = Array.from(files);

            // 处理文件
            const theFileUrl = URL.createObjectURL(selectedFiles[0]);
            setFileUrl(theFileUrl);
            console.log(theFileUrl);
        }
    };

    // 处理拖拽进入区域
    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    // 处理拖拽离开区域
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    // 处理拖拽悬停
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    // 处理文件释放
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        // 获取拖拽的文件
        const droppedFiles = Array.from(e.dataTransfer.files);

        // 处理文件
        const theFileUrl = URL.createObjectURL(droppedFiles[0]);
        setFileUrl(theFileUrl);
        console.log(theFileUrl);
    };

    const onDocumentLoadSuccess = ({
        numPages: nextNumPages,
    }: PDFDocumentProxy) => {
        setNumPages(nextNumPages);
        setRotationArray(Array(nextNumPages).fill(0));
    };

    const rotatePage = (pageIndex: number) => {
        rotationArray[pageIndex] += 90;
        setRotationArray([...rotationArray]);
    };

    const downloadFile = async () => {
        if (fileUrl && pdfBytes) {
            const pdfDoc = await PDFDocument.load(pdfBytes);
            const pages = pdfDoc.getPages();
            pages.forEach((page, index) => {
                page.setRotation(degrees(rotationArray[index]));
            });
            // 生成修改后的 PDF
            const modifiedPdfBytes = await pdfDoc.save();

            // 下载修改后的 PDF
            saveAs(
                new Blob([modifiedPdfBytes], { type: "application/pdf" }),
                "modified-pdf.pdf"
            );
        }
    };

    const rotateAll = () => {
        setRotationArray(rotationArray.map((angle) => angle + 90));
    }

    const removePdf = () => {
        setFileUrl(null);
        setNumPages(0);
        setRotationArray([0]);
    }

    const zoomIn = () => {
        if (width < 500) {
            setScale(scale + 0.1);
            setWidth(width + 50);
        }
    }

    const zoomOut = () => {
        if (width > 200) {
            setScale(scale - 0.1);
            setWidth(width - 50);
        }
    }

    return (
        <div className="w-full bg-[#f7f5ee] text-black">
            <input
                type="file"
                hidden
                accept=".pdf"
                ref={fileRef}
                id="file"
                onChange={handleFileChange}
            />
            <div className="container mx-auto py-20 space-y-5 flex flex-col items-center">
                <div className="flex flex-col items-center space-y-4">
                    <h1 className="text-5xl font-serif">Rotate PDF Pages</h1>
                    <p className="text-gray-600 max-w-lg text-center">
                        Simply click on a page to rotate it. You can then
                        download your modified PDF.
                    </p>
                </div>
                <div>
                    {numPages === 0 && (
                        <div
                            onClick={() => {
                                fileRef.current?.click();
                            }}
                            onDragEnter={handleDragEnter}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className="w-[275px] h-[350px] bg-white flex flex-col justify-center items-center rounded-md border-dashed border border-stone-300 cursor-pointer"
                        >
                            <CloudUpload />
                            <span className="pointer-events-none font-medium text-sm leading-6 pointer opacity-75">
                                Click to upload or drag and drop
                            </span>
                        </div>
                    )}
                    {numPages > 0 && <div className="flex justify-center items-center space-x-2 mb-[20px]">
                        <Button
                            className="bg-[#FD5F39] hover:bg-[#FD5F39] text-white"
                            onClick={rotateAll}
                        >
                            Rotate All
                        </Button>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        className="bg-[#202937] hover:bg-[#202937] text-white"
                                        onClick={removePdf}
                                    >
                                        Remove PDF
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Remove this PDF and select a new one</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        className="w-[36px] h-[36px] bg-white hover:scale-105 hover:bg-white rounded-full"
                                        onClick={zoomIn}
                                        disabled={width >= 500}
                                    >
                                        <ZoomIn color="#202937" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Zoom in</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        className="w-[36px] h-[36px] bg-white hover:scale-105 hover:bg-white rounded-full"
                                        onClick={zoomOut}
                                        disabled={width <= 200}
                                    >
                                        <ZoomOut color="#202937" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Zoom out</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>}
                    <Document
                        file={fileUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        noData=""
                        ref={pdfRef}
                        className="flex flex-wrap justify-center gap-8"
                        loading={<LoaderCircle className="animate-spin" />}
                    >
                        {Array.from(new Array(numPages), (_el, index) => (
                            <div
                                style={{ maxWidth: `${width}px` }}
                                className={`flex flex-col items-center justify-center bg-white p-3 hover:bg-gray-50 hover:cursor-pointer relative overflow-hidden`}
                                key={`page_${index + 1}`}
                                onClick={() => rotatePage(index)}
                            >
                                <div className="pointer-events-none w-full shrink flex-1 flex items-center justify-center">
                                    <Page
                                        pageNumber={index + 1}
                                        rotate={rotationArray[index]}
                                        scale={scale}
                                    />
                                </div>
                                <div className="">{index + 1}</div>
                                <div className="absolute top-2 right-2 bg-[#FD5F39] p-[2px] rounded-full">
                                    <RefreshCw color="#ffffff" size={14}  />
                                </div>
                            </div>
                        ))}
                    </Document>
                </div>
                {numPages > 0 && (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    className="bg-[#FD5F39] hover:bg-[#FD5F39] text-white"
                                    onClick={downloadFile}
                                >
                                    Download
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Split and download PDF</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
            </div>
        </div>
    );
}
