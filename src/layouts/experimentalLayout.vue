<template>
  
  <nav class="bg-blue-700" style="padding: 0px; padding-top: 10px; padding-bottom: 10px">
    <router-link to="/" class="logo" style="display: flex; justify-content: center; align-items: center;">
      <img src="../assets/logo4.png" width="70"  alt="Logo" style="margin-right: -4px;">
      <h1 style="color: white; font-size: 25px; margin: 0;" class="font-bold">Mooring Pin</h1>
    </router-link>
  </nav>
  <main class="mx-auto w-full max-w-screen-xl py-6 lg:py-8">
      <section id="search">
        <div class="mb-4">

<h1 class="mb-2 text-2xl font-extrabold text-gray-700 md:text-5xl lg:text-6xl">Find <span class="text-transparent bg-clip-text bg-gradient-to-r to-sky-600 from-blue-700">Marinas</span></h1>
<p class="text-md font-normal text-gray-500 lg:text-xl dark:text-gray-600">Looking for nearby marinas? Enter a location, adjust the radius, or search directly by marina or canal name.</p>
        </div>
        <SearchForm @searched="handleSearched()"></SearchForm>
      </section>
  <span v-if="savedMarinasStore.savedMarinas && savedMarinasStore.savedMarinas.length > 0" style="display: block;" class="relative">
        <div style="padding: 20px; padding-bottom: 0px;">
          <h1 class="text-2xl font-extrabold text-gray-700 md:text-5xl lg:text-6xl">
            Your Saved
            <span class="text-transparent bg-clip-text bg-gradient-to-r to-sky-600 from-blue-700">
              Marinas
            </span>
          </h1>
        </div>

        <section id="close-by" class="relative" ref="savedItemsContainer">
          <div class="close-items" ref="savedItemsScroll">
            <Card
                v-for="marina in savedMarinasStore.savedMarinas"
                :key="marina.id"
                :id="marina.id!"
                :name="marina.name!"
                description=""
                image=""
                :has-image="false"
                :distance="(marina.distanceFromUser?.toFixed(2))"
                @click="searchStore.searchValue = undefined"
            ></Card>
          </div>
      
        </section>
        <button
            v-if="!hideSavedScrollButton"
            class="absolute border border-gray-500 shadow-lg bg-gray-100 scroll-right-button"
            @click="scrollSearchItems"
        >
            <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
            </svg>
          </button>
      </span>
      <span v-if="searchStore.userLocation && marinasClose != undefined" style="display: block;" class="relative">
        <div style="padding: 20px; padding-bottom: 0px;">
          <h1 class="text-2xl font-extrabold text-gray-700 md:text-5xl lg:text-6xl">
            <span class="text-transparent bg-clip-text bg-gradient-to-r to-sky-600 from-blue-700">
              Marinas
            </span> Closest To You
          </h1>
        </div>

        <section id="close-by" class="relative" ref="closeItemsContainer">
          <div class="close-items" ref="closeItemsScroll">
            <Card
              v-if="marinasClose != undefined"
              v-for="marina in marinasClose"
              :key="marina.id"
              :id="marina.id!"
              :name="marina.name!"
              description=""
              image=""
              :has-image="false"
              :distance="(marina.distanceFromUser!.toFixed(2))"
              @click="searchStore.searchValue = undefined"
            ></Card>
          </div>
      
        </section>
        <button
        v-if="!hideScrollButton"
            class="absolute border border-gray-500 shadow-lg bg-gray-100 scroll-right-button"
            @click="scrollCloseItems"
          >
            <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
            </svg>
          </button>
      </span>

    <!-- <template v-if="mapStore.savedLocations.length > 0">
      <div style="padding: 20px; padding-bottom: 0px;">
        <h2 class="mb-2">Your saved locations</h2>
      </div>
      <section id="close-by">
        <div class="close-items">
          <template v-for="location in mapStore.savedLocations" :key="location.id">
               <Card :name="location.title!" :description="undefined" image="" :has-image="false" :distance="1.2"></Card>
            </template>
        </div>
      </section>
    </template> -->


<!-- <footer class="bg-blue-700 rounded-lg shadow m-4">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
            <a href="/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Mooring Pin</span>
            </a>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 text-white">
                <li>
                  <RouterLink to="/old" class="hover:underline me-4 md:me-6">View Legacy </RouterLink>
                </li>
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                    <a href="#" class="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-400 lg:my-8" />
        <span class="block text-sm text-gray-200 sm:text-center dark:text-gray-200">© 2024 <a href="https://flowbite.com/" class="hover:underline">Mooring Pin</a>. All Rights Reserved.</span>
    </div>
</footer> -->
</main>

  <footer class="bg-blue-700 mt-[30px] p-3">
    <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
      <div class="md:flex md:justify-between">
        <div class="mb-5 md:mb-0">
          <a href="https://www.mooringpin.co.uk" class="flex items-center">
            <img src="../assets/logo4.png" class="h-12 me-0 ml-[-6px]" alt="Mooring Pin Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Mooring Pin</span>
          </a>
        </div>
        <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
          <div>
            <h2 class="mb-6 text-sm font-semibold uppercase text-[#facc15]">Resources</h2>
            <ul class="text-gray-300 font-medium">
              <li class="mb-4">
                <a href="/feedback" class="hover:underline">Feedback Form</a>
              </li>
              <li class="mb-4">
                <a href="/privacy-policy" class="hover:underline">Privacy Policy</a>
              </li>
              <li>
                <a href="/cookie-policy" class="hover:underline">Cookie Policy</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 class="mb-6 text-sm font-semibold uppercase text-[#facc15]">Follow us</h2>
            <ul class="text-gray-300 font-medium">
              <li class="mb-4">
                <a href="https://www.instagram.com/mooringpin/" target="_blank" class="hover:underline">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto lg:my-8" />
      <div class="sm:flex sm:items-center sm:justify-between">
        <span class="text-sm text-gray-300 sm:text-center">© {{currentYear}} <a href="https://mooringpin.co.uk/" class="hover:underline">Mooring Pin</a>. All Rights Reserved.</span>
        <div class="flex mt-4 sm:justify-center sm:mt-0">
<!--          <a href="#" class="text-gray-300 hover:text-white">-->
<!--            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">-->
<!--              <path fill-rule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clip-rule="evenodd"/>-->
<!--            </svg>-->
<!--            <span class="sr-only">Facebook page</span>-->
<!--          </a>-->
<!--          <a href="https://x.com/MooringPin" target="_blank" class="text-gray-300 hover:text-white">-->
<!--            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">-->
<!--              <path fill-rule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clip-rule="evenodd"/>-->
<!--            </svg>-->
<!--            <span class="sr-only">Twitter page</span>-->
<!--          </a>-->
          <!-- Instagram Icon -->
          <a href="https://www.instagram.com/mooringpin/" target="_blank" class="text-[#facc15] hover:text-[#e3ba16]">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M12 2.163c3.313 0 3.688 0 4.978.072 1.285.072 2.162.279 2.669.47.747.263 1.357.695 1.971 1.309.613.613 1.045 1.224 1.308 1.971.192.507.398 1.384.47 2.669.072 1.29.072 1.664.072 4.978s0 3.688-.072 4.978c-.072 1.285-.279 2.162-.47 2.669-.263.747-.695 1.357-1.309 1.971-.613.613-1.224 1.045-1.971 1.308-.507.192-1.384.398-2.669.47-1.29.072-1.664.072-4.978.072s-3.688 0-4.978-.072c-1.285-.072-2.162-.279-2.669-.47-.747-.263-1.357-.695-1.971-1.309-.613-.613-1.045-1.224-1.308-1.971-.192-.507-.398-1.384-.47-2.669C2.163 15.688 2.163 15.313 2.163 12s0-3.688.072-4.978c.072-1.285.279-2.162.47-2.669.263-.747.695-1.357 1.309-1.971.613-.613 1.224-1.045 1.971-1.308.507-.192 1.384-.398 2.669-.47C8.312 2.163 8.687 2.163 12 2.163zm0 1.5c-3.307 0-3.688 0-4.971.07-1.117.072-1.759.303-2.286.492-.525.187-.845.442-1.112.709-.267.267-.522.587-.709 1.112-.189.527-.42 1.169-.492 2.286-.072 1.283-.072 1.664-.072 4.971s0 3.688.072 4.971c.072 1.117.303 1.759.492 2.286.187.525.442.845.709 1.112.267.267.587.522 1.112.709.527.189 1.169.42 2.286.492 1.283.072 1.664.072 4.971.072s3.688 0 4.971-.072c1.117-.072 1.759-.303 2.286-.492.525-.187.845-.442 1.112-.709.267-.267.522-.587.709-1.112.189-.527.42-1.169.492-2.286.072-1.283.072-1.664.072-4.971s0-3.688-.072-4.971c-.072-1.117-.303-1.759-.492-2.286-.187-.525-.442-.845-.709-1.112-.267-.267-.587-.522-1.112-.709-.527-.189-1.169-.42-2.286-.492C15.688 3.663 15.313 3.663 12 3.663zM12 7.75a4.25 4.25 0 1 1 0 8.5 4.25 4.25 0 0 1 0-8.5zm0 1.5a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5zm5.623-2.123a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25z" clip-rule="evenodd"/>
            </svg>
            <span class="sr-only">Instagram page</span>
          </a>
          <!-- YouTube Icon -->
<!--          <a href="https://www.youtube.com" class="text-gray-300 hover:text-white ms-5">-->
<!--            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">-->
<!--              <path fill-rule="evenodd" d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z" clip-rule="evenodd"/>-->
<!--            </svg>-->
<!--            <span class="sr-only">YouTube page</span>-->
<!--          </a>-->
        </div>
      </div>
    </div>
  </footer>



  <!-- <div id="ad-space" v-if="adOpen">
    <span @click="closeAd" style="width: 100%; margin: 0px auto; text-align: center;">        
      click me to close
    </span>
    <img width="100%" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQDw8PEBAVEBAQFRAVFRAQEBASEBISFxIWFxgSGBUYHiggGRoxGxYYITEiJSkrLjAuFyAzODMsNygtLisBCgoKDg0OGhAQGy0lICUtKy0tLS8tLS0tLS0tLS0tLy0vLS0tLS0tLS0tLS0tKy0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAF0CHwMBEQACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAQMEBQYHAgj/xAA4EAACAgIBAgQEBQEIAgMBAAABAgADBBESBSEGEzFBFCJRYQcyQnGBkRUjM0NSYrHBodFTcvAW/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAECAwUEBv/EADMRAQACAgAFAwIFAgUFAAAAAAABAgMRBBIhMUETIlFhwQUycYHRkbFioeHw8RQjQlJy/9oADAMBAAIRAxEAPwDuMBAQEBAQEBAQEBAQEBAQEBAQECx6z1WnEpa+5uKr7fqY+yge5l6Um86hW94rG5cM8U+I7s+7zLPlRdiuoHYQf9n7zrYsUY41DmZMk3ncsLNWZAQEBAQEBAQEBAQEBAQEBAQECICAgICAMCICAgISQIgICBEgICAgISQIkBAQEBAQECZI+n5wnXICAgQZAp22qgLMwVR6liAB/JiZ0aapmePsZLPLrrsu+fy+agLX5uuycmI9frPLbiqxOm0YZlcDxggKK1TgsN/Kytx/2kj1P7TP/rqx4T6Esxg9Wpu7K2m90bsw/ib4+IpfpWeqlsdqr/c3ZgiBMkICAgICAgWPWerU4lLXXNxVfQfqY/6VHuZelJvOoVveKxuXDPFPiO7Pu8yz5UXfl1A/Kg+v3b6mdbFijHGoczJkm87lhZqzICAgICAgICAgICAgICAgICAgIEQEBAQEBAiAgICEogICBEgICAhJAQIkBASQgJASQgICQPqCcN1yAgRuBh+q9erpYVqPMtP6QdKoHqzN7CeXPxNcX1lpTHNnFvGv4gK9p4L8Uldiiwu7BVUHutaD8u9a5+sri4e9/fknp8LWvFelVFc18nLpSnapbkMPNK8nycPK0unX9TVjsHPoP2nRrw/LXmiOjCb77y8eJuhDo2T5SZeY9ZFRUGvlUxbewzn5PoNRTBw9/wA8fsicmSI9stg6T1JXZUVjVbYWWu0sXqsdR+QjfY/869p4/wAT/CPS3kwzuI7x5j/f6teG4vnnlu37wz4iZ2ONkDjcgG9kdx6Bx7lSf5ni4bi+0Xb5cUd6trBnUeV6gICAgICBY9Z6rViUtfc3FV9vdm9lA9zL0pN51Ct7xWNy4Z4p8R3Z9xscla135dW/lQfXXpy+pnWxYoxxqHMyZJvO5YWasyAgICAgICAgICAgICAgICAgICBEBAQEBAQIgICAMJIEQEBAiQEBAQkgRICSEgICAgICAgJI+oJwnXRAp33KilmYKo9SToStrRHc1tiMi+/IGqF4V/8AyPtS4/2jWwPvMbc19RHZpGo7uXfiJ1ZytlGOPJ/yjZsniqndljH9+25nw+H18/T/AMVr39On6tNwvD74dQyMc15bPZWhtUfIiv29+/5iNzt8npRvW5eHm5+nZ2nIWrouErV0nIudqq2Yf4l1rduTH1C79h+08u5y37telK7YyrxzkHzKcnBQEBQUW4EqX7JzqsA+Un33/E1tw8RrllWuXfdyHpVllWP1I3VuoZmNfFCF8wt3Cj2760R9J6+Htelb9GWWItavVvPTHy7lovv4pl4qqGUsvMqwGw3f1I9Qff6T5LjsFsGSY8W6uvw+SL1/R13o2X5tanvvQ7H1H7z2cHljJjefLTllkZ7GRAQEBAses9VpxKWvubiq+g92PsoHuZelJvOoVveKxuXDPFPiK3Pu8x/lRe1dQPZF/wCz951sWKMcahzMmSbzuWFmrMgICAgICAgICAgICAgICAgICAgIEQEBAQEBAiAgICEkCICBBkBAQEJIESAkhICAgICAgICAgfUE4brrTqd1iVO9VfmWKNhC3Hl9tyszrsmFvVgtaK3ydM69+Cb8pWP2P5v5leXm62TvXZkfaX8KuEdesUG4ZCo3mWNzZ+fAasJCaXW+2tj0J9Z6PwqkTiyf/X8M+MmeeuvhgfFHUxjU1VeYbbMgGxVROAVG7VuBr17du3tPdky1rXUR1YUrNp3Lp3hvxlTlY1OP1Sr4e25AP78apvKgbKt+hvQ6Oj7ic++K9er0xaJVereDFVbLsVvM/uxxrdubLw2yGuw+vc/lbYP1mlOIn8tlLY99YaW9YstrLluefWOKf5dFlIJdftuwA6P17z347zt5rR/ksPAddQyMxFawaPzjI0LGYh9nQ7eoM+e/G619lo3uZ6unwNrdYl0r8N+ouweh/wDLLKpG9FfUD/meLg76vr5b569Nt8nWeNMBAQLHrPVqcSlr7m4ov8sx9lUe5l6Um86hW94rG5cL8UeI7s+7zLPlRd+XUD8qD/s/edbFijHGoczJkm87lhpqzICAgICAgICAgICAgICAgICAMC96r0uzGatLCpNlSWrwJI4OWA3sDv8AKZWl4vG4/Ra1ZrOpWUsqQIgICBeZnTnqrotYoVyFZlCuGYAHXzD9Jla3iZmI8LTWYiJnys5ZUMCICAgISiAgIESAgQTAyfX+kHEsrrZw5eqq3YUqAH38vf8AaZ48nPG1705J0ijpBfCuzOYC02V1mvidsX1337esTfV4p8kU9s2Y2XVICAgRAQkgICEJgIH1BOG66ICAMDhfjjpgR+pYtzcUa2q+t1HJlDMCOx7aJDD+JPBdMlsUz36x+3/CM8bit/jowWfdbd8JkYWMtllnCpb3TlZTxYVqpVu2/wBp0snSIvFXlp1ma7bH0/wz1DES9MxGymF65FV1Sm1HYDi9Z9wGU60QB9558d4n81mmSs+Ibz4A6dbiUZC2E14vmFseu0kPVVx22wfyrvehs6+0xzTWbbq1pvXVzvqly3rknFbk1r5eTjuPTza3KW06/wByfNoeuiZ78VprWJr3ebJqbdTwnfbkY/xFid1NasX0H4ctdmHfY0T39p85+NcR6+SI7cu9/q6fBY/TrPnbc/w+xWRmc+j2KV/YrOfwkT6lf9+Hoz9pdGnfc5MJIFt1HMWimy5gzLWpYhByYgD2HvLVrzTEItbljbg3ijxHdn3GxzqtSfLqB+VB9f8A7a9TOvixRjjUOXkyTkncsNNWZAQEBAQEBAQEBAQEBAQEBAQECG9DJG/9Qwq7+q9KptXlXZh0hl2RvS5BHcd/UA/xPFS01w3mPmfs9V4i2asT8R91n0bEwMrIswRjNXoW8MrzXa7lX32yfl0dHt+0m9slKxff7IpWlrTTX7rbGx8PLx80VYxosxazalnms7WIp0RYD23r6S0zelq7ne+iIil6zqNaefD2KtqIB0tsld6sv82xe++/DWlGhrt3k5bTE/n19EY4iY/Lv6qq+HKa83qC3FmxsFBYVB1Y4dVauvft2buf9sj1rTSsx3smMdYvaJ7Q9dKqwsurNYYnkWY+PbYoW2x6z20GPI7DA6+x2e0i85KTWObe5TSKXiemtQs7OnUjA6bdwHmX32pY22+ZRaQBreh2+kvz29S8fEfZTljkrPzP3ZnKw+mp1J+nfCsQ7hPO81w1bOoYBF3oqNgd9n1mUWyzi9Tf7NZjH6nJpj+ieGCxznNDZZxLWoShG4eZYrEMzN7KAAe3ruXyZtcsb1uN7Ux4t8063qdHiPoBTEGWcNsF1sFb0ly9bqw2tikkkd9giMWXd+Xm2ZMft5taWHhfBqyVysdkHxDVM9Fm2BDp3Ka3o7H29jL5bTTVvG+quKsW3Xz4XHTeio+HVtQcnOyBVSzFtVVp/iWaB7+uv6StskxefiI3Ka09kfMz0VbrOm15Rw/hGetX8psk3OL+QbiXCj5dBvbXtIiMs159/XXhMzji3Lr6bSnh6ur+2qrV8x8OtDU5LAgkkhtA6PbXrInLM+nMeT04jnifDH9BwKrMPqlrpyeiug1tthwLNYCdA6PoPX6TTJaYvSI87+ylKxNbTPjX3X/iDFwsajHAoL35WNW4bzHCVEjXma38zFt9vQATPFa97T16RLTJFKxHTrMNe6Tx85Q1DZO9gUozKXbXbuvfXv2+k3vvXSdMaa31jbY+u9EUYFmWcI4NlL1gp5jOllbnjsBiSrBiJhjyf9yK829tslPZza1pT6vj4eAUxbcX4m7gjXWm2xChYb4Vhe3Ye53FJvk90TqPBeKY/bMb+UfiTx+Mp474/CY2t+vH59b++pPC/kn9ZRxH5/2j7q3h96l6PnNchsQZNB8tW48m4roFvYb9f2lcm5zV18SmmvStv5/hbdV6XRfj4WVi1fDnIvOM1PNnQWk/Iyk99dj/AOJal7Vtatp3qNovWJitqxrc6Z3/APlAlwxv7Ltso2FbO81hb37G1U3x477616TH1txzc/X4a+lqeXl6fLGYnRcWjG6hZlIbWwspaxxZlawa4ive9AFiCTregZpOS1rVivmFIpWtbTbxL10voAsxzm14ByjfbYK8ZbGWqipT6s2wzHfYd/aRfJq3JNta8/JXHuOaK734Y/xh0L4dMa8UNi+eHD4ztyNdiH9Le6kHYl8OTmmY3vXlXLTl1Otb8Nam7IgICAhCYH1BOG65AQIMDUvHnhs5VfnVKGvrUqVI/wAWo+qfc+4+8yyRPS9e8dl6z4ntLjfW8TML+fiXvVYCpbHc8Sliduxb0P2P1nQpxH/U16Tq3msz/b/h57Y/TnrG4+Wx/ht486pbnJidQdVp4uTZbWK35KOy89gTG2K0d6/5Lxas+Tx71vKyRmV/EivDS4oVQDjZjcF0zMvzfnBG96M9WPhvZz2Y2yxzahhvCFVmQfKoqb4ethYt77rsa9QF5VgD049vvPNxP4hixR6eONz9/wCktcfDWv7r9G8dQ6NbRRa71aTjoknY2wA5cQfmb2+nefNZMObVsl4/d065KbitZVPAXVRcb9DQqtqTR0NaXv8A/vtJxx6V67RfrEulid14EyQgIHK/xC8D8OeZiJtDtraVH5fc2IB7fUe06HDcTv22eHPg17qucT3PIQEBAQEBAQEBAQEBAQEBAQEBAGSNwHiHH/tLp2VtvKxqK67DwPIOq3A6HuPnWeT0relavmZ/h6JyV9WtvER/LHeF+q1Y+eciwkV6yO4Uk/OrBe38zTLjm2Pljv0VxXit+afqpeHepVUV562Eg5GNZUmlJ25Pbf0H3k5aTaazHiUY7xWLb8wv8zqmFkVYjWvdW2LWiHFrQGuwqSeauTpCd9yQT2EpWl6zOtdfK03paI3vp4VbvElBz81yrPiZtddbhRqxeNSKHAPuCrfwZEYbenWPMfyn1K89p8T/AAuegJiV4/VGossuHwzhrrKxUi8jpawuztidknf6RoSuSbzanNGuq2PkituWd9GGs6rUcHp9Gz5mPda9g4nQVrSw0ffsZr6c89rfMfZnzxyVj4n7q2b1ml+sHNBbyPOrffE8uKooPy/uDIjHaMPJ50TePV5/G/sJ1rHd+oUXhzi5eRZellYHmVP5jFX4n12pAI+0TjtEVtXvEaIvWeaJ7TO2J6lj4iBfh77L233L0eSoXXt8xJO5pWbz+aNfvtS0Uj8s7e/DTXDMxjQpa0WIQo33G++/oNbkZdck83ZOPfPGmW8V9ZC59fw2hXgtqsDupYOWf+ORI/iZYce8fu8tMuT3+3wm3L6W+R8axuVi3mNhitSGs3yI87euJb7biK5YrydP1/0JnHNubr+in0/xKjZOa+Wp8rPRks8ru1f+gjfrodpNsMxWsV71RXLE2tNu0vVfUcGjFzsahrbGyETV1iBAzKx0gQflABJ2frImmS162nwmLUrW1Y8rHxR1OrI+D8sk+TjVVPtSPnVmJA+o7jvL4qTXm35lXLeLa18HhPqtWNZd5vNVvqerzqu9tJb9aiRmpNojXif6mK8Vmd+VzbnYVeBmYlNlltlzUN5tlfAPxsBIC7PHQHqT3JkRW85K2nxtMzTkmsedPfUuo4Ob5d+Q91OQqIliV1K638RoMrEjgT99yK0vj6V1r+ybWpfrbv8A3WfjHqtWXkV20gqi0U18W3tWXltd+/YjvLYaTSup+VctotbcfDzidTqXpmViknzrb6bFHE8eKhd7Pt6RNJnLFvGiLR6c187VB1lF6di0ISMijL8/8p4gBW4nf12R2j059SZntMaOeOSI8xO1bqVvTcuxslrbsayw8rKFoFql/co/IaHv3ErWMlI5YiJ/dNvTtPN2W2N1KlOm5mJtvMtvpdPl7FEI2SfQHt6S00mckW+iItHpzX6veF1HGuxEw8wvX5Lu9ORUgs4h9c0ZNjY2Aex9v6xNbVtzV894TFqzXlt47SoU09OXJqDW3W42m8xxUKn5aPEKuydektM5JrPSNoiKRbv0YizXJuO+Ozrfrrfbf31NFHmAgICBIhD6gnDdcgICBBEgYLrnhXGyuTMvCxtbsTWzr2YHs38zK+GLdY6SvW8w0PL8DD4hsfzRVxC2VNsoLASQV773oj09O4lJz8VX2xfp9Yj+FuTFbrNVXC8E8cmus2CwWhhaVcsFpUctFfTu2u/2+0pfiOKy25ZvuPpr7QmKYqxuK9f3dD6V0ejGGqk19z3M1xYKU7d1LXm3dgvxAz0Sqqnfz2WLpfbt6b+29es8f4jf2xSJ7tuGr1mzU/CeL8PZ1CoHkUvU79ie5P8AzPDmvMzG3oiOnR1TFvDorD0Indx25qxMPBaNTpXmipAQEDlf4heBuHPMxE+Tu1tK/p+tiD6fUfzOjw3E79t3hz4Ne6rnE9ryEBAQEBAQEBAQEBAQEBAQEBAQEBAGBEC56fnWY9gsqbi+iN6Vho+oIIIIkWrFo1K1bTWdwu+pdfyshPLss/u978tErrQn6lUABMpTFSs7iFrZbWjUsXNGZAQIgXnT+qXY4sFNhr81QrFQORX6A+o/iUtSttbWrea70szLqkJQYCBEgIF1idMvtUtVS9ir6sqkgfzKzesd5Wilp7Qi/p9yDk9ZC8a35diAtm+BJBOt6PY9+0RaJ7E1mO6nXjOyWWKu0q4c22o48m4r2J2e/wBNyZmInSNTrb1g4Vl7FKl5MFLHbIgCjW2LOQAO49T7yJtFespiJnpC3MlBAq3YzolbsultDMh2p5KrlCdA7HzKR316SImJnSdSpaOt67em/bf0kj3RQ9hIRSxALHQ9FHqx+g+8iZiO5ETPZOXjPVY9Vi8XQlWXYOiPbYJB/iImJjcExMTqVKSEBAQAhD6hnDdcgICAgeSZAtc3FptGrUVwO45AHX7StqVt3TEzC3pbGx1K1qtY+ijUVpWvYm0ytcrxHUvp8xPYAe5meTNTHG7LUxzaXLfG2fZkGzi22GiQvtphoDXv/wCpwq5Zvl5ruhFOWmoZzwzhtVVYbP8AEusaxgTsgEAAH79t/wAyl7b1BrTZ+i9XFfyP+X1B+h/9T38FxE1jkl582LfWGw0dQrb0YTs6nu8i7VtyBMBAGByv8QvA/DnmYi/J620qPy/WxB9PqJ0OG4nfts8WfBr3Vc4nueMgICAgICAgICAgICAgICAgICAgDAiAgICAgIEQEBAQlBgICQIgbDk0PkY+IaLF4U1cHqNq1slodizlSRvlsHYmETFbTzR3ltMTasanwyh+FcV+eycOPR1Y7HIJxu5rsdwPy8tekz90b5f8X2ae2e/+H7p6aK1+KXNTHrRhi8VxhSK21edFgh2yg6J9+MX3OuTfnv8AoisRG+aI8dv1YnpmQ1DdUVhRzOPb28ulqi4vq0qDWuJBJ4j/AEj6TS0RaK9+/wBpZ1ma80dOzLDHxPNQMmP8MbcEY7L5fm2A2p5gt77I48uXPsPaZ819ed6nf+jTlrvtGumv9WFwmpszn5V0qurxVXoJjmxUYVB/YgkDZPqfX1mttxTvPj9fqzjU37R5/RnkWhvh0vWk3pjW8KajjikWnKYkabdYbgd6PbZP2mO7Rua71v6/H9WsRHSLd9fT5/op3tVZV5FaY+Oq5lfmCwY78Eaqv+8HH1BYEfKew7dhJjcTudz0+pOpjUajqZdGMr8glVbnDyuSj4catW5Ah41/IH4n29oibTH7x8/BMVif2n+7x1Wmq3+0CBSrG+wrkMaX8zugFQJPKs9zpl7eu4pMxy9+3YvETv8Au02+oo7oSCUZlJUhlJU6OiPUdvWemJ3G3nno8SQgIAQh9QzhuuQEBAGBZ5NhEDXeu5lq1kpvcDRMjOL9rSQR6qxIU9/WePiMWS3WG+K9Y7przHTel7ka39B9px8tL+Yeutonyo2bLLcQFIIPbvsD02feY+6vTTSJiWxdOy1ZAxOj9wQJlF+pNVS7QO1IIP0O/wDxN61ZzKh8wPJWZT9ATr+hnuxReOzK01bn4Zvdk+ffb3+s6+ObTHV5LRHhnJdUgICByv8AELwPw55mIu0OzbSo/L9bEA9vqJ0OG4nfts8WfBr3Vc4nueMgICAgICAgICAgICAgICAgICAMCICAgICAgRAQEBCUGAgIESAgISjUBIDUkJAjUBqA1AagISQEBAmEPqCcN1yAgIEGB4esGBb24Kt6jcDEZnhemz9PrAxj+B038pI/Yx37iB4MYDQsOpScdZ8Lc0vS+DmA15jf1lfQxf8ArBz2+VzR4RAOy7f1l4pWPCOaWTxvD1Sd9bP37yyGWqqCjQGoHuAgICAgcr/ELwNw55mInyd2tpX9P1sQfT6j+Z0OG4nftu8WfBr3Vc4nueMgICAgICAgICAgICAgICAgICBEBAQEBAGBEBAQEJRAQECJAQEBCUSAkhICAgRCSAgICBMIIH1BOG65AQEBAQEgJIQI1AagNQJgICAgICAgIHHfxQ8O04ttd9PyC8tyqA+VWHcsv039J0+EyzeOWfDn8Tjis7jy0aet5iAgICAgICAgICAgICAgICAgRAQEBAQBgRAQEBCSBEBAgyAgICEogJASQkBAQIgISQhMBAQP/9k=" alt="">
  </div> -->
  </template>
  <script setup lang="ts">
  import 'vue-select/dist/vue-select.css';
  import {ref, onMounted, watchEffect, computed} from 'vue';
  import {useRouter} from 'vue-router';
  import Card from '../components/experimental/Card.vue';
  import { useSearchStore } from '../stores/searchStore';
  import {useSavedMarinasStore} from "../stores/savedMarinasStore";
  import SearchForm from '../components/experimental/SearchForm.vue';
  import * as client from '../api-client';
  import { DataApi } from '../api-client';
  import {filterOption} from "../types/search";


  const currentYear = computed(() => new Date().getFullYear())
  
  const savedMarinasStore = useSavedMarinasStore();

  const dataApi = new DataApi();
  const searchStore = useSearchStore();

  interface userLocation {
    latitude: number;
    longitude: number;
  }

const userLocation = ref<userLocation | null>(null);
const error = ref<string | null>(null);

const closeItemsContainer = ref<HTMLElement | null>(null);
const closeItemsScroll = ref<HTMLElement | null>(null);
const hideScrollButton = ref<boolean>(false);
let currentScrollPos = 0;

function handleSearched(){
  let services : Array<filterOption> = [];
  searchStore.marinaSearchResults?.forEach(marina => {
    marina.services!.forEach(service => {
      if(!services.some(x => x?.serviceType.value === service.serviceType!.value)){
        const filterOption : filterOption = {
          serviceType: service.serviceType!,
          active: false
        }
        console.log(filterOption);
        services.push(filterOption);
      }
    });
    console.warn(marina.name + ":");
    console.log(services);
  })!;
  services =  services.sort((a:filterOption, b:filterOption) => {
    return a?.serviceType.value!.localeCompare(b?.serviceType.value!);
  });
  searchStore.serviceFilterOptions = [];
  searchStore.serviceFilterOptions!.push(...services);
}

function scrollCloseItems(){
  const container = closeItemsContainer.value;
  const content = closeItemsScroll.value
  if (container && content) {
    const scrollAmount = container.scrollWidth / 5; 
    const futurePos = currentScrollPos + scrollAmount
    container.scrollBy({
      left: scrollAmount, // Scroll horizontally
      behavior: 'smooth', // Smooth scrolling effect
    });

    if((futurePos + scrollAmount) >= container.scrollWidth){
      hideScrollButton.value = true;
      return;
    }

    currentScrollPos += scrollAmount;
  }
}

  // scrollSearchItems
  const savedItemsContainer = ref<HTMLElement | null>(null);
  const savedItemsScroll = ref<HTMLElement | null>(null);
  const hideSavedScrollButton = ref<boolean>(false);
  let currentSavedScrollPos = 0;
  function scrollSearchItems(){
    const container = savedItemsContainer.value;
    const content = savedItemsScroll.value
    if (container && content) {
      const scrollAmount = container.scrollWidth / 5;
      const futurePos = currentSavedScrollPos + scrollAmount
      container.scrollBy({
        left: scrollAmount, // Scroll horizontally
        behavior: 'smooth', // Smooth scrolling effect
      });

      if((futurePos + scrollAmount) >= container.scrollWidth){
        hideSavedScrollButton.value = true;
        return;
      }

      currentSavedScrollPos += scrollAmount;
    }
  }
// const requestLocation = () => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         userLocation.value = {
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         };
//         console.log('Location:', userLocation.value);  // Log location when obtained
//         searchStore.userLocation = `${userLocation.value.longitude}, ${userLocation.value.latitude}`;
//       },
//       (err) => {
//         switch (err.code) {
//           case err.PERMISSION_DENIED:
//             error.value = "User denied the request for Geolocation.";
//             break;
//           case err.POSITION_UNAVAILABLE:
//             error.value = "Location information is unavailable.";
//             break;
//           case err.TIMEOUT:
//             error.value = "The request to get user location timed out.";
//             break;
//           default:
//             error.value = "An unknown error occurred.";
//             break;
//         }
//         console.log('Error:', error.value);  // Log error if occurred
//       }
//     );
//   } else {
//     error.value = "Geolocation is not supported by this browser.";
//     console.log('Error:', error.value);  // Log if geolocation is not supported
//   }
// };

const marinasClose = ref<Array<client.MarinaModel> | undefined>(undefined);

  watchEffect(async () =>{
      if(searchStore.userLocation != undefined){
      const closeMarinaParams : client.DataMarinasClosestGetRequest = {
        userCoordinates: searchStore.userLocation,
        numberOfMarinas: 8
      }

      marinasClose.value = await dataApi.dataMarinasClosestGet(closeMarinaParams) ?? undefined;

      // /marinasClose.value = await dataApi.dataMarinasSearchGet(marinaParams) ?? undefined;
      marinasClose.value = marinasClose.value.sort((a : client.MarinaModel,b : client.MarinaModel) => {
       return a?.distanceFromUser! - b?.distanceFromUser!
      });
      console.warn(marinasClose.value)
    }
  });

onMounted(async () => {
  // requestLocation();
  // Log current state immediately after request
  console.log('Initial Location:', userLocation.value);
  console.log('Initial Error:', error.value);

  // const params : client.DataMarinasSearchGetRequest = {
  //   name: "Marina",
  //   limit: 10,
  //   offset: 0
  // }
  // const res = await dataApi.dataMarinasSearchGet(params);
  // console.log(res);

  // const url: string = `${import.meta.env.VITE_AQUA_API_ROOT}/Types/service-types`;

  // try {
  //       const response = await fetch(url);
  //       // Make the HTTP GET request

  //       // Check if the response is OK (status code 200-299)
  //       if (!response.ok) {
  //           throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       // Parse the JSON from the response
  //       const data = await response.json();

  //       // Log the JSON data to the console
  //       console.log(data);
  //   } catch (error) {
  //       // Log any errors that occur
  //       console.error('Error fetching data:', error);
  //   }
});
  </script>

  <style>
    nav, section{
      padding: 20px;
    }
    

    h1.logo{
      color: white;
      font-size: 25px;
      text-align: center;
      font-weight: bold;
    }

    h2{
      font-size: 20px;
    }

    div.search-types{
      display: flex;
      justify-content: space-between;
      text-align: center;
      margin-top: 15px;
    }

    div.search-type{
      text-align: center;
      padding: 10px;
      border: 2px solid transparent;
      width: 100%;
      margin: 10px;
      color: white;
      border-radius: 100px;
      font-weight: 500;
    }

    div.search-type:hover{
      cursor: pointer;
      background-color: #2563eb;
    }

    div.search-type.active{
      background-color: #1e3a8a;
      border: 2px solid white;
    }
    
    .search-container{
      border: 5px solid #facc15;
      border-radius: 8px;
      /* padding: 5px; */
    }

    .search-container > form{
      padding: 5px;
      background-color: whitesmoke;
    }

    .search-container > form > input, select{
      width: 100%;
      padding: 20px;
      background-color: whitesmoke;
    }

    .search-container > form > input:not(:last-child),
    .search-container > form > select:not(:last-child),
    .form-border-bottom {
      border-bottom: 1px solid rgb(186, 186, 186);
    }

    .search-container > form > input::placeholder{
      color:rgb(143, 143, 143)
    }

    select {
      color: rgb(186, 186, 186);
    }

    .search-container > .container-footer > button{
      width: 100%;
      color: white;
      padding: 0px;
      padding: 15px;
      font-weight: 500;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;

    }

    .close-items{
      width: 800px;
      display: flex;
      justify-content:flex-start;
    }

    section#close-by{
      overflow-x: scroll;
      margin-right: 20px;
    }

    /* Hide scrollbar for Chrome, Safari, and Edge */
    section#close-by::-webkit-scrollbar {
      display: none; /* Chrome, Safari, and Edge */
    }

    div#ad-space{
      position: sticky;
      bottom: 0;
      width: 100%;
      background-color: whitesmoke;
      outline: 2px solid rgb(88, 88, 88);
      padding: 20px;
    }

    .container-header > div.search-error{
      /* background-color: red !important; */
      width: 100%;
      color: white;
      padding: 0px;
      padding: 15px;
      font-weight: 500;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      text-align: center;
    }

    button.scroll-right-button{
      padding: 10px;
      border-radius: 100%;
      z-index: 49;
      top: 50%;
      right: 20px;
    }
  </style>