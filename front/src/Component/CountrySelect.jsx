import React, { useState, useMemo, useRef, useEffect } from "react";
import countryList from "react-select-country-list";
import { ChevronDown, Search, Check } from "lucide-react";

// 1. استقبال خاصية error
const CountrySelect = ({ value, onChange, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const options = useMemo(() => countryList().getData(), []);

  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.label.toLowerCase().includes(search.toLowerCase()),
    );
  }, [options, search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        // 2. تعديل الكلاسات لتطبيق اللون الأحمر عند الخطأ
        className={`w-full px-4 py-3 bg-gray-50 border rounded-xl flex items-center justify-between cursor-pointer transition-all ${
          error
            ? "border-red-500 ring-1 ring-red-500" // ستايل الخطأ
            : isOpen
              ? "border-[#ee2039] ring-1 ring-[#ee2039]"
              : "border-gray-200 hover:border-gray-300"
        }`}
      >
        <span className={selectedLabel ? "text-slate-900" : "text-gray-400"}>
          {selectedLabel || "Select Country"}
        </span>
        <ChevronDown
          size={20}
          className={`text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="p-2 border-b border-gray-100 bg-gray-50/50">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search country..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#ee2039]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                    setSearch("");
                  }}
                  className={`px-4 py-2 text-sm cursor-pointer flex items-center justify-between hover:bg-gray-50 ${
                    value === option.value
                      ? "bg-red-50 text-[#ee2039]"
                      : "text-slate-700"
                  }`}
                >
                  {option.label}
                  {value === option.value && <Check size={16} />}
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-400 text-sm">
                No country found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountrySelect;
