import { useState } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const AddressCard = () => {
  const [copied, setCopied] = useState(false);
  const [copiedDonation, setCopiedDonation] = useState(false);

  const contractAddress = "0xc0mings00n";
  const donationAddress = "0xC0mings00nD";

  const copyAddress = async (text: string, isDonation: boolean) => {
    try {
      await navigator.clipboard.writeText(text);
      if (isDonation) {
        setCopiedDonation(true);
        toast.success("Address copied!");
        setTimeout(() => setCopiedDonation(false), 2000);
      } else {
        setCopied(true);
        toast.success("Address copied!");
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Copy failed:", err);
      toast.error("Failed to copy address");
    }
  };

  return (
    <div className="glass-card p-6 w-full max-w-xl space-y-6">
      <div className="relative overflow-hidden rounded-lg border border-blue-500/20 p-6 bg-gradient-to-r from-blue-500/10 to-blue-300/10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-300/5" />
        <div>
          <p className="text-sm text-blue-400 mb-2 font-bold select-text">Contract Address</p>
          <div className="flex items-center space-x-4">
            <code className="text-blue-300 flex-1 overflow-x-auto select-text">
              {contractAddress}
            </code>
            <button
              onClick={() => copyAddress(contractAddress, false)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Copy contract address"
              type="button"
            >
              <Copy className={copied ? "text-blue-400" : "text-white"} />
            </button>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm text-blue-400 mb-2 font-bold select-text">Donation Address</p>
          <div className="flex items-center space-x-4">
            <code className="text-blue-300 flex-1 overflow-x-auto select-text">
              {donationAddress}
            </code>
            <button
              onClick={() => copyAddress(donationAddress, true)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Copy donation address"
              type="button"
            >
              <Copy className={copiedDonation ? "text-blue-400" : "text-white"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;