export interface FileUpload {
    id: number;
    filename: string; // File name
    mimeType: string; // MIME type (e.g., image/jpeg, application/pdf)
    size: number; // File size in bytes
    data: Uint8Array; // Binary data of the file
    createdAt: Date;
    updatedAt: Date;
    topicId: number; // Foreign key reference to the topic
}