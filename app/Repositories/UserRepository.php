<?php

namespace App\Repositories;

class UserRepository extends AbstractRepository
{
    public function getWithFilters()
    {
        return $this->model->filter(request(['search', 'sort']))
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
