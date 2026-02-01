<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // Name: letters, spaces, and common punctuation only
            'name' => [
                'required',
                'string',
                'max:255',
                'regex:/^[a-zA-Z\s\.\'\-]+$/'
            ],
            // Email: standard email format
            'email' => [
                'required',
                'string',
                'email:rfc,dns',
                'max:255',
                'unique:users',
            ],
            // Password: min 8 chars
            'password' => [
                'required',
                'string',
                'min:8',
                'max:128',
                'confirmed',
            ],
            // NIK: exactly 16 digits
            'nik' => [
                'required',
                'string',
                'regex:/^[0-9]{16}$/',
                function ($attribute, $value, $fail) {
                    // Check if NIK hash already exists
                    $existingUser = User::where('nik_hash', User::hashNik($value))->first();
                    if ($existingUser) {
                        $fail('NIK sudah terdaftar.');
                    }
                },
            ],
            // Phone: digits, spaces, +, - only
            'phone_number' => [
                'required',
                'string',
                'max:20',
                'regex:/^[0-9\s\+\-]+$/'
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'name.regex' => 'Nama hanya boleh berisi huruf, spasi, dan tanda baca umum.',
            'email.email' => 'Format email tidak valid.',
            'email.unique' => 'Email sudah terdaftar.',
            'password.min' => 'Password minimal 8 karakter.',
            'password.confirmed' => 'Konfirmasi password tidak cocok.',
            'nik.regex' => 'NIK harus 16 digit angka.',
            'nik.unique' => 'NIK sudah terdaftar.',
            'phone_number.regex' => 'Nomor telepon hanya boleh berisi angka, spasi, +, dan -.',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'Validation failed',
            'errors' => $validator->errors(),
        ], 422));
    }
}
