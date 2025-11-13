"use client";

import { cn, getSubjectColor, configureAssistant } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import soundwaves from '@/constants/soundwaves.json'
import { Button } from "./ui/button";
import { MicOffIcon, MicIcon, PhoneOff, Loader } from "lucide-react";
import { addToSessionHistory } from "@/lib/actions/companion.actions";

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED'
}

export default function CompanionComponent({ companionId, subject, name, topic, userImage, userName, style, voice }: CompanionComponentProps) {

    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE)
    const [isSpeaking, setIsSpeaking] = useState(false);
    const lottieRef = useRef<LottieRefCurrentProps>(null);
    const [isMuted, setIsMuted] = useState(false);
    const [messages, setMessages] = useState<SavedMessage[]>([]);

    useEffect(() => {
        if (lottieRef) {
            if (isSpeaking) {
                lottieRef.current?.play();
            } else {
                lottieRef.current?.stop();
            }
        }
    }, [isSpeaking, lottieRef]);

    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
        const onCallEnd = () => {
            setCallStatus(CallStatus.FINISHED)
            addToSessionHistory(companionId);
        };
        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);

        const onMessage = (message: Message) => {
            if (message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage = { role: message.role, content: message.transcript };
                setMessages((prev) => [newMessage, ...prev]);
            }
        };

        const onCallError = (error: Error) => console.log('Call error:', error);

        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('speech-start', onSpeechStart);
        vapi.on('speech-end', onSpeechEnd);
        vapi.on('message', onMessage);
        vapi.on('error', onCallError);

        return () => {
            vapi.off('call-start', onCallStart);
            vapi.off('call-end', onCallEnd);
            vapi.off('speech-start', onSpeechStart);
            vapi.off('speech-end', onSpeechEnd);
            vapi.off('message', onMessage);
            vapi.off('error', onCallError);
        }
    }, [])

    const toggleMicrophone = () => {
        const isMuted = vapi.isMuted();
        vapi.setMuted(!isMuted);
        setIsMuted(!isMuted);
    }

    const handleCall = async () => {
        setCallStatus(CallStatus.CONNECTING);

        const assistantOverrides = {
            variableValues: { subject, topic, style },
            clientMessages: ['transcript'],
            serverMessages: [],
        };
        // @ts-expect-error - typescript type error
        await vapi.start(configureAssistant(voice, style), assistantOverrides);
    };

    const handleDisconnect = async () => {
        setCallStatus(CallStatus.FINISHED);
        vapi.stop();
    }

    return (
        <section className="flex flex-col h-[70vh] " >
            <section className="flex gap-8 max-sm:flex-col">
                <div className="companion-section" style={{ backgroundColor: getSubjectColor(subject) }}>
                    <div className="companion-avatar ">
                        <div className={cn(
                            'absolute transition-opacity duration-150',
                            callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE ? 'opacity-100' : 'opacity-0',
                            callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse'
                        )} >
                            <Image
                                src={`/icons/${subject}.svg`}
                                alt={subject}
                                width={80}
                                height={80}
                                className="max-sm:w-fit"
                            />
                        </div>
                        <div className={cn(
                            'absolute transition-opacity duration-1000',
                            callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0'
                        )}>
                            <Lottie
                                lottieRef={lottieRef}
                                animationData={soundwaves}
                                autoplay={false}
                                loop={true}
                                className="companion-lottie"
                            />
                        </div>
                    </div>
                    <p className="font-bold text-2xl mb-4" >
                        {name}
                    </p>
                </div>
                <div className="user-section">
                    <div className="user-avatar">
                        <Image
                            src={userImage}
                            alt={userName}
                            width={80}
                            height={80}
                            className="rounded-full ring-4"
                        />
                        <p className="font-bold text-2xl" >
                            {userName}
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <Button variant="secondary" size="lg"
                            className={cn('rounded-xl btn-mic w-full transition-colors duration-500',
                                callStatus === CallStatus.ACTIVE
                                    ? 'bg-neutral-800 hover:bg-neutral-700 text-white'
                                    : 'bg-white hover:bg-gray-100'
                            )}
                            onClick={toggleMicrophone}
                            disabled={callStatus !== CallStatus.ACTIVE}
                        >
                            {isMuted
                                ? <MicOffIcon className="w-5 h-5" />
                                : <MicIcon className="w-5 h-5" />
                            }
                            <span>
                                {isMuted
                                    ? 'Unmute'
                                    : 'Mute'
                                } Microphone
                            </span>
                        </Button>
                        <Button
                            className={cn(
                                'rounded-lg cursor-pointer transition-colors w-full',
                                callStatus === CallStatus.ACTIVE ? 'bg-rose-500 hover:bg-rose-500 text-white'
                                    : callStatus === CallStatus.CONNECTING ? 'bg-yellow-400 hover:bg-yellow-400 text-white cursor-not-allowed'
                                        : ''
                            )} onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
                        >
                            {callStatus === CallStatus.CONNECTING ? (
                                <span className="flex gap-3">
                                    <Loader className="animate-spin inline-block" />
                                    Connecting...
                                </span>
                            ) : callStatus === CallStatus.ACTIVE ? (
                                <>
                                    End session <PhoneOff className="ml-2 inline-block" />
                                </>
                            ) : (
                                "Start session"
                            )}
                        </Button>
                    </div>
                </div>

            </section>
            <section className="transcript">
                <div className="transcript-message no-scrollbar">
                    {messages.map((message, index) => {
                        if (message.role === 'assistant') {
                            return (
                                <p key={index}
                                    className="max-sm:text-sm">
                                    {
                                        name
                                            .split(' ')[0]
                                            .replace('/[.,]/g, ', '')
                                    }: {message.content}
                                </p>
                            )
                        } else {
                            return (
                                <p key={index} className="text-primary max-sm:text-sm">
                                    {userName}: {message.content}
                                </p>
                            )
                        }
                    })}
                </div>
                <div className="transcript-fade" />
            </section>
        </section >
    )
}