<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Inertia\Inertia;
use Throwable;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

class Handler extends ExceptionHandler
{
    protected $dontReport = [];

    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    public function register(): void
    {
        //
    }

    public function render($request, Throwable $exception)
    {
        if ($request->header('X-Inertia')) {
            $status = 500;

            if ($exception instanceof HttpExceptionInterface) {
                $status = $exception->getStatusCode();
            }

            return Inertia::render('ErrorPage', ['status' => $status])
                ->toResponse($request)
                ->setStatusCode($status);
        }

        return parent::render($request, $exception);
    }
}
