<?php

namespace App\Traits;

use App\Models\Module;

trait HasModule
{
    public function modules()
    {
        return $this->belongsToMany(Module::class, 'roles_has_modules')->orderBy('_lft');
    }

    public function assignModule(...$modules)
    {
        $modules = $this->convertToModuleIds($modules);

        if ($modules->count() > 0) {
            $this->modules()->syncWithoutDetaching($modules);

            return $this;
        }

        return false;
    }

    private function convertToModuleIds($modules)
    {
        return collect(array_map(function ($module) {
            $module = Module::firstWhere('slug', $module);

            if ($module) {
                return $module->id;
            }
        }, $modules));
    }
}
