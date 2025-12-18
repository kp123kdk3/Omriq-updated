import { IconBase, type IconProps } from "@/components/icons/IconBase";

// Hero card semantics
export function InboundSignalIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 12h8" />
      <path d="M9 8l3 4-3 4" />
      <path d="M14.5 9.2c1.2 0 2.2 1.3 2.2 2.8s-1 2.8-2.2 2.8" opacity="0.55" />
      <path d="M18.2 7.6c2.0 1.4 2.8 2.8 2.8 4.4s-.8 3-2.8 4.4" opacity="0.35" />
    </IconBase>
  );
}

export function KnowledgeCoreIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 5.5 4.5 9.5 12 13.5 19.5 9.5 12 5.5Z" />
      <path d="M4.5 13l7.5 4 7.5-4" opacity="0.55" />
      <circle cx="12" cy="9.5" r="1.6" fill="currentColor" opacity="0.35" stroke="none" />
    </IconBase>
  );
}

export function OutcomeBranchIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M8 6.5v11" />
      <path d="M8 11.5h7.5a2.5 2.5 0 0 0 2.5-2.5V7.5" />
      <path d="M8 14.5h6.5a2.5 2.5 0 0 1 2.5 2.5v0.5" opacity="0.55" />
      <circle cx="18" cy="7" r="1.6" fill="currentColor" opacity="0.35" stroke="none" />
      <circle cx="17" cy="18" r="1.6" fill="currentColor" opacity="0.35" stroke="none" />
    </IconBase>
  );
}

// Problem semantics
export function MissedCallIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M6.5 9.2c3-2.6 8-2.6 11 0" />
      <path d="M8.5 11.6c2-1.6 5-1.6 7 0" opacity="0.55" />
      <path d="M9.2 16.2l5.6-5.6" opacity="0.55" />
      <path d="M7.5 17.5c2.8-1.2 6.2-1.2 9 0" />
    </IconBase>
  );
}

export function FrontDeskLoadIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M6 10h12" />
      <path d="M6 14h12" />
      <path d="M7.5 7.5h9" opacity="0.55" />
      <path d="M7.5 17.5h9" opacity="0.55" />
    </IconBase>
  );
}

export function AvailabilityIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6Z" />
      <path d="M12 9.8v2.8l1.8 1.2" opacity="0.55" />
      <path
        d="M18.8 6.2l.7 2 .7 2.1 2.1.3-1.6 1.4.5 2.1-1.8-1.1-1.8 1.1.5-2.1-1.6-1.4 2.1-.3.7-2.1Z"
        opacity="0.35"
      />
    </IconBase>
  );
}

export function DisconnectedNodesIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="7" cy="8" r="1.6" fill="currentColor" opacity="0.35" stroke="none" />
      <circle cx="17" cy="8" r="1.6" fill="currentColor" opacity="0.35" stroke="none" />
      <circle cx="12" cy="17" r="1.6" fill="currentColor" opacity="0.35" stroke="none" />
      <path d="M8.4 9.1l2.6 5.2" opacity="0.55" />
      <path d="M15.6 9.1l-2.0 4.0" opacity="0.55" />
      <path d="M10.7 10.7l2.6-2.6" opacity="0.35" />
    </IconBase>
  );
}

// Integration category semantics
export function PMSIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M7.5 7.5h9a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z" />
      <path d="M9 11h6M9 14h6" opacity="0.55" />
    </IconBase>
  );
}

export function TelephonyIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M8.5 10.5c1.5 3.5 3.5 5.5 7 7" />
      <path d="M10 8.2l-1.4 1.4a2 2 0 0 0-.4 2.3" opacity="0.55" />
      <path d="M16.8 14l-1.4 1.4a2 2 0 0 1-2.3.4" opacity="0.55" />
      <path d="M13.5 8.5c1.2 0 2.2 1 2.2 2.2" opacity="0.35" />
      <path d="M15.2 6.8c2.0 0 3.6 1.6 3.6 3.6" opacity="0.25" />
    </IconBase>
  );
}

export function ReservationsIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M7 4.5v2M17 4.5v2" />
      <path d="M6.5 8h11" />
      <path d="M6.5 6.5h11a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2Z" />
      <path d="M9 12h2M13 12h2M9 15h2" opacity="0.55" />
    </IconBase>
  );
}

export function POSIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M7.5 7.5h9a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z" />
      <path d="M9 10.5h6" opacity="0.55" />
      <path d="M9 14h6" opacity="0.55" />
      <path d="M11 16.8h2" opacity="0.55" />
    </IconBase>
  );
}

export function PlatformIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 7.5h16M4 12h16M4 16.5h16" />
      <path d="M6.5 5.5v13M12 5.5v13M17.5 5.5v13" opacity="0.55" />
    </IconBase>
  );
}

export function FlowIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 7h7a3 3 0 0 1 3 3v7" />
      <path d="M19 17h-7a3 3 0 0 1-3-3V7" opacity="0.55" />
      <path d="M19 17l-2-2M19 17l-2 2" />
    </IconBase>
  );
}

export function AgentIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3Z" />
      <path d="M19 11a7 7 0 0 1-14 0" />
      <path d="M12 18v3M8 21h8" opacity="0.55" />
    </IconBase>
  );
}

export function IntegrationsIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M8.5 8.5h7v7h-7z" />
      <path d="M4.5 12h4M15.5 12h4" />
      <path d="M12 4.5v4M12 15.5v4" opacity="0.55" />
    </IconBase>
  );
}

export function EnterpriseIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M6.5 20V8.5a2 2 0 0 1 2-2H17.5v13.5" />
      <path d="M4.5 20h15" />
      <path d="M9.5 10.5h2M9.5 13.5h2M9.5 16.5h2" opacity="0.55" />
    </IconBase>
  );
}

export function InvestorsIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5.5 18.5V10.5M12 18.5V6.5M18.5 18.5V13" />
      <path d="M4 18.5h16" opacity="0.55" />
    </IconBase>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M7 4.5v2M17 4.5v2" />
      <path d="M6.5 8h11" />
      <path d="M6.5 6.5h11a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2Z" />
    </IconBase>
  );
}

export function MicrophoneIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 14a3 3 0 0 0 3-3V7a3 3 0 0 0-6 0v4a3 3 0 0 0 3 3Z" />
      <path d="M19 11a7 7 0 0 1-14 0" />
      <path d="M12 18v3M8 21h8" opacity="0.55" />
    </IconBase>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M7 12.5l3 3 7-7" />
    </IconBase>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M7 17L17 7" />
      <path d="M11 7h6v6" />
    </IconBase>
  );
}

export function WaveIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3.5 12c2.2-4.8 4.8-4.8 7 0s4.8 4.8 7 0 4.8-4.8 7 0" />
    </IconBase>
  );
}

export function BrokenWaveIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3.5 12c1.6-3.4 3.4-4.5 5.2-2.2" />
      <path d="M10.8 14.2c1.6 2.7 3.4 2.7 5 0" />
      <path d="M18.2 9.8c1.8-2.3 3.6-1.2 5.3 2.2" />
      <path d="M9.7 9.7 14.3 14.3" opacity="0.55" />
    </IconBase>
  );
}

export function LayersIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 5.5 4.5 9.5 12 13.5 19.5 9.5 12 5.5Z" />
      <path d="M4.5 13l7.5 4 7.5-4" opacity="0.55" />
      <path d="M4.5 16.5l7.5 4 7.5-4" opacity="0.35" />
    </IconBase>
  );
}

export function NodesIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="7" cy="7" r="1.7" fill="currentColor" opacity="0.35" stroke="none" />
      <circle cx="17" cy="7" r="1.7" fill="currentColor" opacity="0.35" stroke="none" />
      <circle cx="12" cy="17" r="1.7" fill="currentColor" opacity="0.35" stroke="none" />
      <path d="M7 7l5 10M17 7l-5 10" opacity="0.55" />
    </IconBase>
  );
}

export function SlidersIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M6 7h12" />
      <path d="M6 12h12" opacity="0.55" />
      <path d="M6 17h12" />
      <circle cx="10" cy="7" r="1.8" fill="currentColor" opacity="0.35" stroke="none" />
      <circle cx="15" cy="12" r="1.8" fill="currentColor" opacity="0.28" stroke="none" />
      <circle cx="12" cy="17" r="1.8" fill="currentColor" opacity="0.35" stroke="none" />
    </IconBase>
  );
}

export function StarFragmentIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 4.8l2.2 4.5 5 .7-3.6 3.4.9 4.9L12 16l-4.5 2.3.9-4.9L4.8 10l5-.7L12 4.8Z" />
      <path d="M6.5 7.5l11 11" opacity="0.55" />
    </IconBase>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 4.5 19 7.5v5.7c0 4-2.6 6.7-7 7.8-4.4-1.1-7-3.8-7-7.8V7.5l7-3Z" />
      <path d="M9 12.5l2 2 4-4" opacity="0.55" />
    </IconBase>
  );
}


