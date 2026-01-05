/**
 * PesertaAddPage - Step Wizard Form for Adding New Participant
 * Refactored version using focused components and custom hook
 *
 * Route: /dashboard/pendaftaran/tambah-peserta
 */

import { useNavigate, Link } from "react-router-dom";
import { Home, ChevronRight, Users, User, MapPin, ClipboardCheck } from "lucide-react";
import { usePesertaAdd } from "@/presentation/hooks/usePesertaAdd";
import { useDocumentTitle } from "@/presentation/hooks/useDocumentTitle";
import { StepIndicator, FullPageLoading, type Step } from "@/presentation/components/common";
import { 
  CategoryStep, 
  PersonalDataStep, 
  AddressStep, 
  ConfirmationStep, 
  PesertaAddFooter 
} from "@/presentation/components/peserta/add";

const steps: Step[] = [
  { id: 1, title: "Kategori", icon: Users },
  { id: 2, title: "Data Pribadi", icon: User },
  { id: 3, title: "Alamat", icon: MapPin },
  { id: 4, title: "Konfirmasi", icon: ClipboardCheck },
];

export function PesertaAddPage() {
  useDocumentTitle('Tambah Peserta');
  const navigate = useNavigate();
  const {
    currentStep,
    isLoading,
    form,
    handleChange,
    handleNext,
    handlePrev,
    handleSubmit,
    getCategoryRequiredLabel,
    getCategoryFieldValue,
  } = usePesertaAdd();

  const handleBatal = () => navigate("/dashboard/participants");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Loading Overlay */}
      {isLoading && <FullPageLoading message="Menyimpan data peserta..." />}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tambah Peserta</h1>
          <p className="text-gray-500 text-sm mt-1">Daftarkan peserta baru ke posyandu</p>
        </div>
        <nav className="hidden sm:flex items-center gap-2 text-sm">
          <Link to="/dashboard" className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors">
            <Home className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link to="/dashboard/participants" className="text-gray-500 hover:text-gray-700 transition-colors">
            Daftar Peserta
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="font-medium text-gray-900">Tambah</span>
        </nav>
      </div>

      {/* Step Indicator */}
      <StepIndicator steps={steps} currentStep={currentStep} />

      {/* Steps Content */}
      <div className="mb-6">
        {currentStep === 1 && (
          <CategoryStep 
            selectedKategori={form.kategori} 
            onKategoriChange={(key) => handleChange("kategori", key)} 
          />
        )}

        {currentStep === 2 && (
          <PersonalDataStep 
            form={form} 
            handleChange={handleChange}
            categoryRequiredLabel={getCategoryRequiredLabel()}
            categoryFieldValue={getCategoryFieldValue()}
          />
        )}

        {currentStep === 3 && (
          <AddressStep 
            form={form} 
            handleChange={handleChange} 
          />
        )}

        {currentStep === 4 && (
          <ConfirmationStep 
            form={form} 
            categoryRequiredLabel={getCategoryRequiredLabel()}
            categoryFieldValue={getCategoryFieldValue()}
          />
        )}
      </div>

      {/* Footer Navigation */}
      <PesertaAddFooter 
        currentStep={currentStep}
        isLoading={isLoading}
        onPrev={currentStep === 1 ? handleBatal : handlePrev}
        onNext={handleNext}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
