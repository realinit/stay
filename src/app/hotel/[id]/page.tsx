"use client";

import React from 'react';
import HotelDetailPage from '../../../components/pages/HotelDetailPage';

interface HotelDetailProps {
  params: {
    id: string;
  };
}

export default function HotelDetail({ params }: HotelDetailProps) {
  return <HotelDetailPage hotelId={params.id} />;
} 