<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Medical Management</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

    <!-- Styles -->
    @viteReactRefresh
    @vite(['resources/sass/app.scss','resources/js/app.js'])
</head>

<body class="antialiased">
    <!-- <div id="root"></div> -->
    <div class="bg-gray-100 text-gray-900">
        <!-- <h1 class="text-2xl text-center p-4">Hello</h1> -->
        <nav class="bg-white p-4 shadow-md">
            <div class="flex justify-between mx-auto">
                <a href="#" class="text-lg font-semibold no-underline">DMS</a>
                <div class="flex gap-4">
                    <a class="text-blue-500 hover:text-blue-700 no-underline" href="#">Doctors</a>
                    <a class="text-blue-500 hover:text-blue-700 no-underline" href="#">Patients</a>
                    <a class="text-blue-500 hover:text-blue-700 no-underline" href="#">Appointments</a>
                </div>
            </div>
        </nav>
        <div class="container mx-auto mt-10">
            @yield('content')
        </div>
    </div>
</body>

</html>