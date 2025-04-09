"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api, TRPCReactProvider } from "~/trpc/react";
import Link from "next/link";

export default function FancySearch() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [debounced, setDebounced] = useState("");

  const polysearch = api.polygon.search.useQuery(
    {
      name: debounced,
    },
    {
      enabled: debounced.length > 0,
    },
  );

  useEffect(() => {
    const update = setTimeout(() => {
      setDebounced(searchInput);
    }, 500);

    return () => clearTimeout(update);
  }, [searchInput]);

  return (
    <TRPCReactProvider>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[350px] justify-between"
          >
            {value ? value : "Search for stocks..."}
            <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[350px] p-0">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search stocks..."
              onInput={(e) => setSearchInput(e.currentTarget.value)}
            />
            <CommandList>
              <CommandEmpty>No results. {polysearch.data?.length}</CommandEmpty>
              <CommandGroup>
                {polysearch.data?.map((ticker) => {
                  return (
                    <Link href={`/stock/${ticker.ticker}`} key={ticker.ticker}>
                      <CommandItem
                        value={ticker.ticker}
                        onSelect={(currentValue) => {
                          setValue(currentValue);
                          setSearchInput("");
                          setOpen(false);
                        }}
                      >
                        {ticker.ticker}
                      </CommandItem>
                    </Link>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </TRPCReactProvider>
  );
}
