<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

interface EloquentDetailInterface
{
    public function getFirstWithDetail();

    public function getWithDetailById($id);

    public function getAllWithDetail();
}
