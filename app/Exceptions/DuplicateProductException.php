<?php

namespace App\Exceptions;

use Exception;

class DuplicateProductException extends Exception
{
    // private function __construct(string $message = '', int $code = 0)
    // {
    //     parent::__construct($message, $code);
    // }

    public function report()
    {
        // \Log::debug('User not found');
    }

    public function render($request)
    {
        // if($this->getCode() == 23000) {
        //     return response()->json([
        //         "error" => true,
        //         "message" => $this->getMessage()
        //     ]);
        // }

        return response();
    }
}
