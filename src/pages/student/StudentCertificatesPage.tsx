import { Award, Download, ExternalLink } from 'lucide-react'
import { PageTransition } from '@/components/animations/PageTransition'
import { StudentPageHeader } from '@/components/student/StudentUI'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { studentCertificates } from '@/data/studentPortal'

export default function StudentCertificatesPage() {
  return (
    <PageTransition>
      <StudentPageHeader
        title="Certificates"
        description="Your earned credentials and course completions."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        {studentCertificates.map((cert) => (
          <Card key={cert.id} className="overflow-hidden rounded-[18px]">
            <div className="relative aspect-[4/3] bg-gradient-to-br from-accent-primary/30 to-accent-secondary/20">
              <img
                src={cert.thumbnail}
                alt={cert.courseTitle}
                className="h-full w-full object-cover opacity-40"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <Award className="h-12 w-12 text-highlight" />
                <h3 className="mt-4 text-lg font-bold">{cert.courseTitle}</h3>
                <p className="mt-1 text-sm text-white/60">Certificate of Completion</p>
                <p className="mt-4 text-xs text-white/40">{cert.credentialId}</p>
              </div>
            </div>
            <CardContent className="p-5">
              <div className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-white/50">Instructor</p>
                  <p className="font-medium">{cert.instructor}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/50">Completed</p>
                  <p className="font-medium">{cert.completedDate}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="highlight" size="sm" className="flex-1 rounded-full">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button variant="secondary" size="sm" className="rounded-full">
                  <ExternalLink className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageTransition>
  )
}
