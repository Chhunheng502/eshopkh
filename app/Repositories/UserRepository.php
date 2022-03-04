<?php

namespace App\Repositories;

use App\Filters\UserFilters;

class UserRepository extends AbstractRepository
{
    public function getWithFilters()
    {
        return $this->model->filter(new UserFilters)
                            ->paginate(15)
                            ->withQueryString();
    }

    public function update($data, $user)
    {
        $user->update($data->only([
                'first_name',
                'last_name',
                'email',
                'phone',
                'address'
        ]));

        return true;
    }
}
