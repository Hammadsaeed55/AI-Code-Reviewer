import { reviewCodeService } from "../services/reviewService.js";
import supportedLanguages from "../constants/languages.js";

export const reviewCode = async (req, res) => {
    try {
        const { language, code } = req.body;

        if (!language || language.trim()==="") {
            return res.status(400).json({success: false, message: "programming language is required"});
        }

        if(!supportedLanguages.includes(language)){
            return res.status(400).json({success:false, message:"Unsupported programming Language"})
        }

         if (!code || code.trim()==="") {
            return res.status(400).json({success: false, message: "Code is required."});
        }

        const review = await reviewCodeService(language ,code);

        return res.status(200).json({success: true,review});

    } catch (error) {
       return res.status(500).json({success: false,message:"Internal server error!"});
    }
};