// src/views/PredicateFinder.jsx
import React, { useState } from 'react';
import { 
  Search, FileText, Building2, Calendar, ChevronRight, 
  ArrowLeft, Filter, ExternalLink, Star, StarOff, Clock,
  CheckCircle, AlertCircle, Loader2, X, Download, Bookmark
} from 'lucide-react';

export default function PredicateFinder({ onBack }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [productCode, setProductCode] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [savedPredicates, setSavedPredicates] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    yearFrom: '',
    yearTo: '',
    decisionCode: ''
  });

  // Search FDA database
  const handleSearch = async () => {
    if (!searchQuery.trim() && !productCode.trim()) return;
    
    setLoading(true);
    setSearched(true);
    
    try {
      // Build openFDA API query
      let searchTerms = [];
      if (searchQuery.trim()) {
        searchTerms.push(`(device_name:"${searchQuery}" OR statement_or_summary:"${searchQuery}")`);
      }
      if (productCode.trim()) {
        searchTerms.push(`product_code:"${productCode.toUpperCase()}"`);
      }
      
      const query = searchTerms.join(' AND ');
      const url = `https://api.fda.gov/device/510k.json?search=${encodeURIComponent(query)}&limit=25&sort=decision_date:desc`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.results) {
        setResults(data.results);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const toggleSaved = (device) => {
    const kNumber = device.k_number;
    if (savedPredicates.includes(kNumber)) {
      setSavedPredicates(prev => prev.filter(k => k !== kNumber));
    } else {
      setSavedPredicates(prev => [...prev, kNumber]);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    // FDA date format: YYYY-MM-DD or YYYYMMDD
    const cleaned = dateStr.replace(/-/g, '');
    if (cleaned.length === 8) {
      const year = cleaned.substring(0, 4);
      const month = cleaned.substring(4, 6);
      const day = cleaned.substring(6, 8);
      return `${month}/${day}/${year}`;
    }
    return dateStr;
  };

  const getDecisionBadge = (code) => {
    const decisions = {
      'SEKD': { label: 'Substantially Equivalent', color: 'green' },
      'SESD': { label: 'Substantially Equivalent', color: 'green' },
      'SESE': { label: 'Substantially Equivalent', color: 'green' },
      'SESK': { label: 'Substantially Equivalent', color: 'green' },
      'SESU': { label: 'Substantially Equivalent', color: 'green' },
    };
    const decision = decisions[code] || { label: code || 'Unknown', color: 'gray' };
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
        decision.color === 'green' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
      }`}>
        <CheckCircle className="w-3 h-3 mr-1" />
        {decision.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 text-purple-200 hover:text-white transition mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Predicate Device Finder</h1>
              <p className="text-purple-200">Search FDA's 510(k) database to find similar cleared devices</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-6xl mx-auto px-4 -mt-4 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Main Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by device name, intended use, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>
            
            {/* Product Code */}
            <div className="w-full md:w-40">
              <input
                type="text"
                placeholder="Product Code"
                value={productCode}
                onChange={(e) => setProductCode(e.target.value.toUpperCase())}
                onKeyPress={handleKeyPress}
                maxLength={3}
                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition uppercase"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3.5 border rounded-xl flex items-center justify-center space-x-2 transition ${
                showFilters ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-5 h-5" />
              <span className="hidden md:inline">Filters</span>
            </button>
            
            {/* Search Button */}
            <button
              onClick={handleSearch}
              disabled={loading || (!searchQuery.trim() && !productCode.trim())}
              className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </>
              )}
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year From</label>
                <input
                  type="number"
                  placeholder="e.g., 2020"
                  value={filters.yearFrom}
                  onChange={(e) => setFilters({ ...filters, yearFrom: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year To</label>
                <input
                  type="number"
                  placeholder="e.g., 2024"
                  value={filters.yearTo}
                  onChange={(e) => setFilters({ ...filters, yearTo: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Decision</label>
                <select
                  value={filters.decisionCode}
                  onChange={(e) => setFilters({ ...filters, decisionCode: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">All Decisions</option>
                  <option value="SEKD">Substantially Equivalent</option>
                </select>
              </div>
            </div>
          )}

          {/* Quick Search Suggestions */}
          {!searched && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-2">Popular searches:</p>
              <div className="flex flex-wrap gap-2">
                {['Blood glucose monitor', 'Pulse oximeter', 'ECG monitor', 'Surgical instrument', 'Catheter'].map(term => (
                  <button
                    key={term}
                    onClick={() => { setSearchQuery(term); }}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 rounded-lg text-sm transition"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {loading && (
          <div className="text-center py-12">
            <Loader2 className="w-10 h-10 text-purple-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Searching FDA database...</p>
          </div>
        )}

        {!loading && searched && results.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">Try different keywords or a broader search term.</p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600">
                Found <span className="font-semibold text-gray-900">{results.length}</span> cleared devices
              </p>
              {savedPredicates.length > 0 && (
                <button className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium">
                  <Bookmark className="w-4 h-4" />
                  <span>{savedPredicates.length} saved</span>
                </button>
              )}
            </div>

            <div className="grid gap-4">
              {results.map((device, idx) => (
                <div 
                  key={device.k_number || idx}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 md:p-5 border border-gray-100 group"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {/* Main Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg line-clamp-1">
                            {device.device_name || 'Unknown Device'}
                          </h3>
                          <p className="text-purple-600 font-mono text-sm">{device.k_number}</p>
                        </div>
                        <button
                          onClick={() => toggleSaved(device)}
                          className={`p-2 rounded-lg transition ${
                            savedPredicates.includes(device.k_number)
                              ? 'text-amber-500 bg-amber-50'
                              : 'text-gray-400 hover:text-amber-500 hover:bg-amber-50'
                          }`}
                        >
                          {savedPredicates.includes(device.k_number) ? (
                            <Star className="w-5 h-5 fill-current" />
                          ) : (
                            <StarOff className="w-5 h-5" />
                          )}
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1.5">
                          <Building2 className="w-4 h-4 text-gray-400" />
                          <span>{device.applicant || 'Unknown'}</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{formatDate(device.decision_date)}</span>
                        </div>
                        {device.product_code && (
                          <div className="flex items-center space-x-1.5">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="font-mono">{device.product_code}</span>
                          </div>
                        )}
                      </div>

                      {device.statement_or_summary && (
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                          {device.statement_or_summary}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-2">
                        {getDecisionBadge(device.decision_code)}
                        {device.review_advisory_committee && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                            {device.review_advisory_committee}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex md:flex-col gap-2 md:w-40">
                      <button
                        onClick={() => setSelectedDevice(device)}
                        className="flex-1 md:w-full px-4 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition flex items-center justify-center space-x-2"
                      >
                        <span>View Details</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <a
                        href={`https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=${device.k_number}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 md:w-full px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition flex items-center justify-center space-x-2"
                      >
                        <span>FDA Page</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Empty State - Before Search */}
        {!searched && !loading && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Your Predicate Device</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              Search the FDA's 510(k) database to find cleared devices similar to yours. 
              A strong predicate is key to a successful submission.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
                <h4 className="font-medium text-gray-900">Search by Name</h4>
                <p className="text-sm text-gray-500">Device name or keywords</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 font-mono font-bold">ABC</span>
                </div>
                <h4 className="font-medium text-gray-900">Product Code</h4>
                <p className="text-sm text-gray-500">3-letter FDA code</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <h4 className="font-medium text-gray-900">Recent Clearances</h4>
                <p className="text-sm text-gray-500">Sorted by date</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Device Detail Modal */}
      {selectedDevice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedDevice(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-purple-200 text-sm font-mono mb-1">{selectedDevice.k_number}</p>
                  <h3 className="text-xl font-bold">{selectedDevice.device_name}</h3>
                </div>
                <button
                  onClick={() => setSelectedDevice(null)}
                  className="p-2 hover:bg-white/20 rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-5 overflow-y-auto max-h-[60vh]">
              <div className="grid gap-4">
                <DetailRow label="Applicant" value={selectedDevice.applicant} />
                <DetailRow label="Decision Date" value={formatDate(selectedDevice.decision_date)} />
                <DetailRow label="Product Code" value={selectedDevice.product_code} />
                <DetailRow label="Regulation Number" value={selectedDevice.regulation_number} />
                <DetailRow label="Device Class" value={selectedDevice.device_class} />
                <DetailRow label="Advisory Committee" value={selectedDevice.review_advisory_committee} />
                
                {selectedDevice.statement_or_summary && (
                  <div>
                    <label className="text-sm font-medium text-gray-500 block mb-1">Statement/Summary</label>
                    <p className="text-gray-900 text-sm leading-relaxed bg-gray-50 rounded-lg p-3">
                      {selectedDevice.statement_or_summary}
                    </p>
                  </div>
                )}

                {selectedDevice.address_1 && (
                  <DetailRow 
                    label="Address" 
                    value={`${selectedDevice.address_1}, ${selectedDevice.city}, ${selectedDevice.state} ${selectedDevice.zip_code}, ${selectedDevice.country_code}`} 
                  />
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-100 p-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => toggleSaved(selectedDevice)}
                className={`flex-1 px-4 py-2.5 rounded-lg font-medium flex items-center justify-center space-x-2 transition ${
                  savedPredicates.includes(selectedDevice.k_number)
                    ? 'bg-amber-100 text-amber-700'
                    : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {savedPredicates.includes(selectedDevice.k_number) ? (
                  <>
                    <Star className="w-4 h-4 fill-current" />
                    <span>Saved as Predicate</span>
                  </>
                ) : (
                  <>
                    <StarOff className="w-4 h-4" />
                    <span>Save as Predicate</span>
                  </>
                )}
              </button>
              <a
                href={`https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=${selectedDevice.k_number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition flex items-center justify-center space-x-2"
              >
                <span>View on FDA.gov</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-scale-in { animation: scale-in 0.2s ease-out; }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
      `}</style>
    </div>
  );
}

function DetailRow({ label, value }) {
  if (!value) return null;
  return (
    <div>
      <label className="text-sm font-medium text-gray-500 block mb-0.5">{label}</label>
      <p className="text-gray-900">{value}</p>
    </div>
  );
}