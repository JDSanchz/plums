'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';


export default function ImageForm () {
    return (
        <div>
            <h1>Upload Image</h1>
            <input type="file" />
            <button> Upload </button>
        </div>
    )
}