<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // 1. Asegurar que los directorios de storage existan siempre
        $storagePaths = [
            storage_path('framework/sessions'),
            storage_path('framework/views'),
            storage_path('framework/cache/data'),
            storage_path('logs'),
        ];
        foreach ($storagePaths as $path) {
            if (!is_dir($path)) {
                @mkdir($path, 0755, true);
            }
        }

        // 2. Fallback de APP_KEY si falta en .env
        if (empty(config('app.key'))) {
            config(['app.key' => 'base64:8XHRIG9TZOhM+Sr5gm3VzMJNyKSQPirEETtDdTEeDCM=']);
        }

        // 3. Fallback de sesión si el driver es database pero la tabla sessions no existe
        if (config('session.driver') === 'database') {
            try {
                if (!\Illuminate\Support\Facades\Schema::hasTable('sessions')) {
                    config(['session.driver' => 'file']);
                }
            } catch (\Throwable $e) {
                config(['session.driver' => 'file']);
            }
        }

        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            $frontend = rtrim(config('app.frontend_url'), '/');
            $email = urlencode($notifiable->getEmailForPasswordReset());

            // El frontend (SPA) lee "token" y "email" desde el query string
            // en la ruta /reset-password (ver ResetPasswordPage.tsx).
            return "{$frontend}/reset-password?token={$token}&email={$email}";
        });
    }
}
