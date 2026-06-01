import Select from 'react-select';
import { BsStars } from 'react-icons/bs';
import { HiOutlineCode } from 'react-icons/hi';
import Editor from '@monaco-editor/react';
import { IoCloseSharp, IoCopy } from 'react-icons/io5';
import { PiExportBold } from 'react-icons/pi';
import { ImNewTab } from 'react-icons/im';
import { FiRefreshCcw } from 'react-icons/fi';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { buildComponentPrompt, FRAMEWORK_OPTIONS, GEMINI_MODEL } from '../constants/generator';
import { geminiClient, hasGeminiApiKey } from '../services/geminiClient';
import { extractCodeBlock } from '../utils/code';

const selectStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: '#111',
    borderColor: '#333',
    color: '#fff',
    boxShadow: 'none',
    '&:hover': { borderColor: '#555' },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: '#111',
    color: '#fff',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? '#333' : state.isFocused ? '#222' : '#111',
    color: '#fff',
    '&:active': { backgroundColor: '#444' },
  }),
  singleValue: (base) => ({ ...base, color: '#fff' }),
  placeholder: (base) => ({ ...base, color: '#aaa' }),
  input: (base) => ({ ...base, color: '#fff' }),
};

const Home = () => {
  const [outputScreen, setOutputScreen] = useState(false);
  const [tab, setTab] = useState(1);
  const [prompt, setPrompt] = useState('');
  const [framework, setFramework] = useState(FRAMEWORK_OPTIONS[0]);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const generateComponent = async () => {
    if (!prompt.trim()) {
      toast.error('Please describe your component first');
      return;
    }

    if (!hasGeminiApiKey) {
      toast.error('Missing Gemini API key. Add VITE_GEMINI_API_KEY to your .env file.');
      return;
    }

    try {
      setLoading(true);
      const response = await geminiClient.models.generateContent({
        model: GEMINI_MODEL,
        contents: buildComponentPrompt({
          prompt: prompt.trim(),
          framework: framework.value,
        }),
      });

      setCode(extractCodeBlock(response.text));
      setOutputScreen(true);
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while generating code');
    } finally {
      setLoading(false);
    }
  };

  const copyCode = async () => {
    if (!code.trim()) {
      toast.error('No code to copy');
      return;
    }

    try {
      await navigator.clipboard.writeText(code);
      toast.success('Code copied to clipboard');
    } catch (error) {
      console.error('Failed to copy: ', error);
      toast.error('Failed to copy');
    }
  };

  const downloadFile = () => {
    if (!code.trim()) {
      toast.error('No code to download');
      return;
    }

    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'GenUI-Code.html';
    link.click();
    URL.revokeObjectURL(url);
    toast.success('File downloaded');
  };

  return (
    <>
      <Navbar />

      <main className="grid grid-cols-1 gap-6 px-6 lg:grid-cols-2 lg:px-16">
        <section className="mt-5 w-full rounded-xl bg-[#141319] p-5 py-6">
          <h2 className='sp-text text-[25px] font-semibold'>AI UI Component Maker</h2>
          <p className='mt-2 text-[16px] text-gray-400'>Describe your component and let AI code it for you.</p>

          <label className='mt-4 block text-[15px] font-[700]' htmlFor="framework-select">Framework</label>
          <Select
            inputId="framework-select"
            className='mt-2'
            options={FRAMEWORK_OPTIONS}
            value={framework}
            styles={selectStyles}
            onChange={(selected) => setFramework(selected ?? FRAMEWORK_OPTIONS[0])}
          />

          <label className='mt-5 block text-[15px] font-[700]' htmlFor="component-prompt">
            Describe your component
          </label>
          <textarea
            id="component-prompt"
            onChange={(event) => setPrompt(event.target.value)}
            value={prompt}
            className='mt-3 min-h-[200px] w-full resize-none rounded-xl bg-[#09090B] p-3 text-white outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500'
            placeholder="Describe your component in detail and AI will generate it..."
          />

          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className='text-sm text-gray-400'>Click generate to create your component code.</p>
            <button
              onClick={generateComponent}
              type="button"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-lg border-0 bg-gradient-to-r from-purple-400 to-purple-600 px-5 py-3 transition-all hover:scale-105 hover:opacity-80 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? <ClipLoader color='white' size={18} /> : <BsStars />}
              Generate
            </button>
          </div>
        </section>

        <section className="relative mt-2 h-[80vh] w-full overflow-hidden rounded-xl bg-[#141319]">
          {!outputScreen ? (
            <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
              <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-purple-600 p-5 text-[30px]">
                <HiOutlineCode />
              </div>
              <p className='mt-3 text-[16px] text-gray-400'>Your component and code will appear here.</p>
            </div>
          ) : (
            <>
              <div className="flex h-[50px] w-full items-center gap-3 bg-[#17171C] px-3">
                <button
                  onClick={() => setTab(1)}
                  type="button"
                  className={`w-1/2 rounded-lg py-2 transition-all ${tab === 1 ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-gray-300'}`}
                >
                  Code
                </button>
                <button
                  onClick={() => setTab(2)}
                  type="button"
                  className={`w-1/2 rounded-lg py-2 transition-all ${tab === 2 ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-gray-300'}`}
                >
                  Preview
                </button>
              </div>

              <div className="flex h-[50px] w-full items-center justify-between bg-[#17171C] px-4">
                <p className='font-bold text-gray-200'>Code Editor</p>
                <div className="flex items-center gap-2">
                  {tab === 1 ? (
                    <>
                      <button onClick={copyCode} type="button" aria-label="Copy code" className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 hover:bg-[#333]"><IoCopy /></button>
                      <button onClick={downloadFile} type="button" aria-label="Download code" className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 hover:bg-[#333]"><PiExportBold /></button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setIsPreviewOpen(true)} type="button" aria-label="Open fullscreen preview" className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 hover:bg-[#333]"><ImNewTab /></button>
                      <button onClick={() => setRefreshKey((prev) => prev + 1)} type="button" aria-label="Refresh preview" className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 hover:bg-[#333]"><FiRefreshCcw /></button>
                    </>
                  )}
                </div>
              </div>

              <div className="h-full">
                {tab === 1 ? (
                  <Editor value={code} height="100%" theme='vs-dark' language="html" />
                ) : (
                  <iframe
                    key={refreshKey}
                    title="Generated component preview"
                    srcDoc={code}
                    className="h-full w-full bg-white text-black"
                  />
                )}
              </div>
            </>
          )}
        </section>
      </main>

      {isPreviewOpen && (
        <div className="absolute inset-0 h-screen w-screen overflow-auto bg-white">
          <div className="flex h-[60px] w-full items-center justify-between bg-gray-100 px-5 text-black">
            <p className='font-bold'>Preview</p>
            <button
              onClick={() => setIsPreviewOpen(false)}
              type="button"
              aria-label="Close fullscreen preview"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-300 hover:bg-gray-200"
            >
              <IoCloseSharp />
            </button>
          </div>
          <iframe title="Generated component fullscreen preview" srcDoc={code} className="h-[calc(100vh-60px)] w-full" />
        </div>
      )}
    </>
  )
}

export default Home
