/**
 * usePesertaAdd Hook
 * Logic for multi-step participant registration form
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { KategoriKey } from "@/domain/entities/Peserta";
import type { CreatePesertaRequest } from "@/data/models/PesertaApiTypes";
import { pesertaApiDataSource } from "@/data/datasources/PesertaApiDataSource";

export interface FormData {
  // Base fields
  kategori: KategoriKey | null;
  nama: string;
  nik: string;
  tanggalLahir: Date | null;
  jenisKelamin: "Laki-Laki" | "Perempuan" | "";
  kepesertaanBpjs: boolean;
  nomorBpjs: string;
  alamat: string;
  rt: string;
  rw: string;
  telepon: string;
  // Category-specific required fields
  namaSuami: string; // bumil
  namaOrtu: string;  // balita, remaja
  pekerjaan: string; // produktif, lansia
}

export interface UsePesertaAddReturn {
  currentStep: number;
  isLoading: boolean;
  form: FormData;
  handleChange: (field: keyof FormData, value: string | boolean | Date | null) => void;
  handleNext: () => void;
  handlePrev: () => void;
  handleSubmit: () => Promise<void>;
  getCategoryRequiredLabel: () => { field: keyof FormData; label: string; placeholder: string } | null;
  getCategoryFieldValue: () => string;
  setCurrentStep: (step: number) => void;
}

export function usePesertaAdd(): UsePesertaAddReturn {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    kategori: null,
    nama: "",
    nik: "",
    tanggalLahir: null,
    jenisKelamin: "",
    kepesertaanBpjs: false,
    nomorBpjs: "",
    alamat: "",
    rt: "",
    rw: "",
    telepon: "",
    namaSuami: "",
    namaOrtu: "",
    pekerjaan: "",
  });

  const handleChange = (field: keyof FormData, value: string | boolean | Date | null) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const getCategoryRequiredLabel = (): { field: keyof FormData; label: string; placeholder: string } | null => {
    switch (form.kategori) {
      case "bumil":
        return { field: "namaSuami", label: "Nama Suami", placeholder: "Masukkan nama suami" };
      case "balita":
      case "remaja":
        return { field: "namaOrtu", label: "Nama Orang Tua/Wali", placeholder: "Masukkan nama orang tua/wali" };
      case "produktif":
      case "lansia":
        return { field: "pekerjaan", label: "Pekerjaan", placeholder: "Masukkan pekerjaan" };
      default:
        return null;
    }
  };

  const getCategoryFieldValue = (): string => {
    switch (form.kategori) {
      case "bumil":
        return form.namaSuami;
      case "balita":
      case "remaja":
        return form.namaOrtu;
      case "produktif":
      case "lansia":
        return form.pekerjaan;
      default:
        return "";
    }
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!form.kategori) {
          toast.error("Silakan pilih kategori peserta");
          return false;
        }
        return true;
      case 2:
        if (!form.nama.trim()) {
          toast.error("Nama wajib diisi");
          return false;
        }
        if (!form.nik.trim() || form.nik.length !== 16) {
          toast.error("NIK harus 16 digit");
          return false;
        }
        if (!form.tanggalLahir) {
          toast.error("Tanggal lahir wajib diisi");
          return false;
        }
        if (!form.jenisKelamin) {
          toast.error("Jenis kelamin wajib diisi");
          return false;
        }
        if (form.kepesertaanBpjs && form.nomorBpjs.length !== 13) {
          toast.error("Nomor BPJS harus 13 digit");
          return false;
        }
        // Validate category-specific required field
        const categoryField = getCategoryRequiredLabel();
        if (categoryField && !getCategoryFieldValue().trim()) {
          toast.error(`${categoryField.label} wajib diisi`);
          return false;
        }
        return true;
      case 3:
        if (!form.alamat.trim()) {
          toast.error("Alamat wajib diisi");
          return false;
        }
        if (!form.rt.trim()) {
          toast.error("RT wajib diisi");
          return false;
        }
        if (!form.rw.trim()) {
          toast.error("RW wajib diisi");
          return false;
        }
        if (!form.telepon.trim() || form.telepon.length < 10) {
          toast.error("Nomor telepon wajib diisi (min. 10 digit)");
          return false;
        }
        return true;
      case 4:
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const buildApiRequest = (): CreatePesertaRequest => {
    const request: CreatePesertaRequest = {
      nik: form.nik,
      nama: form.nama,
      kategori: form.kategori as KategoriKey,
      tanggal_lahir: form.tanggalLahir 
        ? `${form.tanggalLahir.getFullYear()}-${String(form.tanggalLahir.getMonth() + 1).padStart(2, '0')}-${String(form.tanggalLahir.getDate()).padStart(2, '0')}`
        : '',
      jenis_kelamin: form.jenisKelamin as "Laki-Laki" | "Perempuan",
      alamat: form.alamat,
      rt: form.rt,
      rw: form.rw,
      telepon: form.telepon,
      kepesertaan_bpjs: form.kepesertaanBpjs,
    };

    if (form.kepesertaanBpjs && form.nomorBpjs) {
      request.nomor_bpjs = form.nomorBpjs;
    }

    // Add category-specific fields
    switch (form.kategori) {
      case "bumil":
        request.nama_suami = form.namaSuami;
        break;
      case "balita":
      case "remaja":
        request.nama_ortu = form.namaOrtu;
        break;
      case "produktif":
      case "lansia":
        request.pekerjaan = form.pekerjaan;
        break;
    }

    return request;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const request = buildApiRequest();
      console.log("[usePesertaAdd] Submitting:", request);
      
      const response = await pesertaApiDataSource.createPeserta(request);
      
      if (response.success) {
        toast.success(`Berhasil! ${form.nama} telah terdaftar sebagai peserta.`);
        // Direct redirect to participant list
        navigate(`/dashboard/participants?success=1&nama=${encodeURIComponent(form.nama)}&nik=${encodeURIComponent(form.nik)}`, { replace: true });
      } else {
        // Handle validation errors
        if (response.errors) {
          const firstError = Object.values(response.errors)[0];
          toast.error(firstError?.[0] || "Gagal mendaftarkan peserta");
        } else {
          toast.error(response.message || "Gagal mendaftarkan peserta");
        }
      }
    } catch (error: unknown) {
      console.error("[usePesertaAdd] Error:", error);
      
      // Handle axios error response
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string; errors?: Record<string, string[]> } } };
        if (axiosError.response?.data?.errors) {
          const firstError = Object.values(axiosError.response.data.errors)[0];
          toast.error(firstError?.[0] || "Gagal mendaftarkan peserta");
        } else if (axiosError.response?.data?.message) {
          toast.error(axiosError.response.data.message);
        } else {
          toast.error("Gagal mendaftarkan peserta. Silakan coba lagi.");
        }
      } else {
        toast.error("Gagal mendaftarkan peserta. Silakan coba lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    currentStep,
    isLoading,
    form,
    handleChange,
    handleNext,
    handlePrev,
    handleSubmit,
    getCategoryRequiredLabel,
    getCategoryFieldValue,
    setCurrentStep,
  };
}
