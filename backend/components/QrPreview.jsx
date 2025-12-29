import React from 'react'
import QRCode from "react-qr-code"
import {Flex, Box, Text, Card} from '@sanity/ui'
import { QrCode } from 'lucide-react'
import { useFormValue } from 'sanity' // Import this to track live changes

export function QrPreview(props) {
  // 1. Grab the live slug and custom link values from the form
  const slug = useFormValue(['slug'])
  const customLink = useFormValue(['customQrLink'])

  // 2. Set your actual website domain here
  const baseUrl = "https://www.pccilaspinas.org/member/" 
  
  // 3. Logic: Use custom link if it exists, otherwise use baseUrl + slug
  const currentSlug = slug?.current || ''
  const destination = customLink || `${baseUrl}${currentSlug}`

  return (
    <Card padding={4} border radius={2} shadow={1} marginY={2} style={{ background: '#16191d' }}>
      <Flex direction="column" align="center" gap={3}>
        <Flex align="center" gap={2}>
          <QrCode size={18} color="#22c55e" />
          <Text size={1} weight="bold" style={{ color: 'white' }}>Live QR Code Preview</Text>
        </Flex>

        <Box style={{ background: 'white', padding: '12px', display: 'inline-block', borderRadius: '8px' }}>
           {currentSlug || customLink ? (
             <QRCode 
               size={140} 
               value={destination} 
               fgColor="#14532d" 
               level="H" // Higher error correction
             />
           ) : (
             <Box padding={4} style={{ width: 140, textAlign: 'center' }}>
               <Text size={1} muted>Generate a slug to see the QR code.</Text>
             </Box>
           )}
        </Box>

        <Box style={{ textAlign: 'center' }}>
          <Text size={1} muted style={{ wordBreak: 'break-all', fontSize: '11px' }}>
            <strong style={{ color: '#22c55e' }}>Target:</strong> {destination}
          </Text>
        </Box>
      </Flex>
    </Card>
  )
}