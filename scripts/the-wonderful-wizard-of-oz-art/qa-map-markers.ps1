$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$repo = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$book = Get-Content (Join-Path $repo 'library/the-wonderful-wizard-of-oz.pwk') -Raw | ConvertFrom-Json
$out = Join-Path $PSScriptRoot 'qa/maps'
New-Item -ItemType Directory -Force -Path $out | Out-Null
foreach ($layer in $book.mapLayers) {
    $blob = $book.blobs | Where-Object id -eq $layer.imageId | Select-Object -First 1
    $imagePath = Join-Path $repo ($blob.url.Replace('/', '\'))
    $bitmap = [System.Drawing.Bitmap]::new($imagePath)
    try {
        $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
        try {
            $scale = if ($layer.imageWidth -gt 1500) { 2 } else { 1 }
            $font = [System.Drawing.Font]::new('Arial', 14 * $scale, [System.Drawing.FontStyle]::Bold)
            $fill = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(232, 255, 255, 235))
            $ink = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(145, 25, 20))
            $ring = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(145, 25, 20), 2 * $scale)
            try {
                $n = 0
                foreach ($marker in @($book.locationMarkers | Where-Object mapLayerId -eq $layer.id)) {
                    $n++
                    $radius = 12 * $scale
                    $graphics.FillEllipse($fill, $marker.x-$radius, $marker.y-$radius, 2*$radius, 2*$radius)
                    $graphics.DrawEllipse($ring, $marker.x-$radius, $marker.y-$radius, 2*$radius, 2*$radius)
                    $graphics.DrawString([string]$n, $font, $ink, $marker.x-$radius+2, $marker.y-$radius-3)
                    Write-Output "$($layer.name): $n $($marker.name) $($marker.x),$($marker.y)"
                }
            } finally { $font.Dispose(); $fill.Dispose(); $ink.Dispose(); $ring.Dispose() }
        } finally { $graphics.Dispose() }
        $name = ($layer.id -replace '^oz-map-', '') + '-markers.png'
        $bitmap.Save((Join-Path $out $name), [System.Drawing.Imaging.ImageFormat]::Png)
    } finally { $bitmap.Dispose() }
}
